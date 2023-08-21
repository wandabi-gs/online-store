import graphene
from product.types import ProductImageType, ProductType, VendorType, CategoryType
from product.models import Vendor, Category, Product

class ProductQuery(graphene.ObjectType):
    latest_products = graphene.List(ProductType)
    all_products = graphene.List(ProductType)
    product_by_id = graphene.Field(ProductType, product_uid=graphene.UUID())
    all_vendors = graphene.List(VendorType)
    vendor_by_id = graphene.Field(VendorType, vendor_uid=graphene.UUID())
    vendor_category = graphene.Field(VendorType, vendor_uid=graphene.UUID(), category_uid=graphene.UUID())
    all_categories = graphene.List(CategoryType)
    category_by_id = graphene.Field(CategoryType, category_uid=graphene.UUID())
    category_vendor = graphene.Field(CategoryType, category_uid=graphene.UUID(), vendor_uid=graphene.UUID())

    def resolve_latest_products(self, info):
        return Product.objects.order_by('-created_at')[:5]
    
    def resolve_all_products(self, info):
        return Product.objects.all()

    def resolve_product_by_id(self, info, product_uid):
        return Product.objects.get(uid=product_uid)
    
    def resolve_all_vendors(self, info):
        return Vendor.objects.all()
    
    def resolve_vendor_by_id(self, info, vendor_uid):
        return Vendor.objects.get(uid = vendor_uid)
    
    def resolve_vendor_category(self, info, vendor_uid, category_uid):
        return Product.objects.filter(vendor__uid= vendor_uid, category__uid=category_uid)

    def resolve_all_categories(self, info):
        return Category.objects.all()

    def resolve_category_by_id(self, info, category_uid):
        return Category.objects.get(uid=category_uid)

    def resolve_category_vendor(self, info, category_uid, vendor_uid):
        return Product.objects.filter(vendor__uid= vendor_uid, category__uid=category_uid)