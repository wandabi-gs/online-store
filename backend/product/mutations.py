import graphene
from product.models import Product, Like, Review
from graphql_jwt.decorators import login_required

class ChangeRating(graphene.Mutation):
    class Arguments:
        product_uid = graphene.UUID(required=True)
        rating = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, product_uid, rating):
        user = info.context.user
        print(user)
        product = Product.objects.get(uid=product_uid)
        print(rating)
        if user.is_anonymous:
            raise Exception("Authentication is required")
        
        review, created = Review.objects.get_or_create(user=user, product=product)
        review.rating = rating
        review.save()

        return ChangeRating(success=True)

class ToggleLike(graphene.Mutation):
    class Arguments:
        product_uid = graphene.UUID(required=True)

    success = graphene.Boolean()
    user_liked = graphene.Boolean()

    @login_required
    def mutate(self, info, product_uid):
        user = info.context.user
        try:
            product = Product.objects.get(uid=product_uid)
            like, created = Like.objects.get_or_create(user=user, product=product)
            if not created:
                like.delete()
                user_liked = False
            else:
                user_liked = True
            success = True
        except Product.DoesNotExist:
            success = False
            user_liked = False

        return ToggleLike(success=success, user_liked=user_liked)

class ProductMutation(graphene.ObjectType):
    toggle_like = ToggleLike.Field()
    change_rating = ChangeRating.Field()