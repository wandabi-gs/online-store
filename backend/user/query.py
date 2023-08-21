import graphene
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required

User = get_user_model()

class UserProfile(graphene.ObjectType):
    uid = graphene.UUID()
    email = graphene.String()
    created_at = graphene.DateTime()
    last_updated_at = graphene.DateTime()

class UserQuery(graphene.ObjectType):
    user_profile = graphene.Field(UserProfile)

    @login_required
    def resolve_user_profile(self, info):
        user = info.context.user
        return user