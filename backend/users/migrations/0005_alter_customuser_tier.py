# Generated by Django 4.1.4 on 2022-12-29 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_customuser_tier'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='tier',
            field=models.CharField(blank=True, choices=[(0, 'Free'), (1, 'Mid'), (2, 'Pro')], default='Free', max_length=10),
        ),
    ]
