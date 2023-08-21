from django.contrib import admin
from product.models import Vendor, Category, Review, Product, Recommendation, ProductImage, Like

admin.site.register(Product)
admin.site.register(Vendor)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(Like)
admin.site.register(Review)
