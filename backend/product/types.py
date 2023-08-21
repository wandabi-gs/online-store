import graphene
from graphene_django.types import DjangoObjectType
from product.models import Vendor, Category, Review, Product, ProductImage, Recommendation, Like

class VendorType(DjangoObjectType):
    class Meta:
        model = Vendor

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category

class ReviewType(DjangoObjectType):
    class Meta:
        model = Review

class ProductReview(graphene.ObjectType):
    email = graphene.String()
    review = graphene.String()
    created_at = graphene.DateTime()

class ProductType(DjangoObjectType):    
    user_liked = graphene.Boolean()
    discount = graphene.Int()
    remaining_product = graphene.Int()
    image = graphene.String()
    rating = graphene.Int()
    reviews = graphene.List(ProductReview)

    def resolve_reviews(self, info):
        p_reviews = []
        for p_review in Review.objects.filter(product__uid=self.uid):
            p_reviews.append(
                ProductReview(email=p_review.user.email, review=p_review.review, created_at=p_review.created_at)
            )
        return p_reviews

    def resolve_rating(self, info):
        return self.avg_rating()

    def resolve_user_liked(self, info):
        user_id = info.context.user.id
        try:
            Like.objects.get(product__id=self.id, user__id= user_id)
            return True
        
        except Like.DoesNotExist:
            return False

    def resolve_discount(self, info):
        if self.price > 0 and self.discount > 0:
            return (self.discount/ self.price)*100
        
        return 0
    
    def resolve_remaining_product(self, info):
        return self.total_product - self.product_sold
    
    def resolve_image(self, info):
        images =  ProductImage.objects.filter(product__id=self.id).order_by('id')
        return images[0].image
    
    class Meta:
        model = Product

class ProductImageType(DjangoObjectType):
    class Meta:
        model = ProductImage

class LikeType(DjangoObjectType):
    class Meta:
        model = Like

class RecommendationType(DjangoObjectType):
    class Meta:
        model = Recommendation

