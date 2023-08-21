import graphene
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required

User = get_user_model()

class RegisterUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, email, password):
        # Check if the user with the email already exists
        if User.objects.filter(email=email).exists():
            return RegisterUser(success=False, message='User with this email already exists.')

        # Create and save the user
        user = User.objects.create_user(email=email, password=password)
        return RegisterUser(success=True, message='User registered successfully.')

class UpdatePassword(graphene.Mutation):
    class Arguments:
        current_password = graphene.String(required=True)
        new_password = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    @login_required
    def mutate(self, info, current_password, new_password):
        user = info.context.user
        if user.check_password(current_password):
            user.set_password(new_password)
            user.save()
            return UpdatePassword(success=True, message='Password updated successfully.')
        return UpdatePassword(success=False, message='Current password is incorrect.')

class DeleteAccount(graphene.Mutation):
    success = graphene.Boolean()
    message = graphene.String()

    @login_required
    def mutate(self, info):
        user = info.context.user
        user.delete()
        return DeleteAccount(success=True, message='Account deleted successfully.')

class UserMutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    update_password = UpdatePassword.Field()
    delete_account = DeleteAccount.Field()