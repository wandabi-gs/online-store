# Generated by Django 4.2.4 on 2023-08-15 17:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_productimages'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductImages',
            new_name='ProductImage',
        ),
    ]
