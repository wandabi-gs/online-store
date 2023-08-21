import graphene
import graphql_jwt
from user.mutations import UserMutation
from user.query import UserQuery
from product.query import ProductQuery
from product.mutations import ProductMutation
from cart.query import CartQuery
from cart.mutations import CartMutation
from order.mutations import OrderMutation

class Mutation(UserMutation, ProductMutation, CartMutation, OrderMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(UserQuery, ProductQuery, CartQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(mutation=Mutation, query=Query)