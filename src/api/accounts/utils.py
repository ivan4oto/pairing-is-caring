from rest_framework import serializers
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.forms.models import model_to_dict


def create_serializer_class(name, fields):
    return type(name, (serializers.Serializer, ), fields)

def inline_serializer(*, fields, data=None, **kwargs):
    serializer_class = create_serializer_class(name='', fields=fields)

    if data is not None:
        return serializer_class(data=data, **kwargs)

    return serializer_class(**kwargs)

def get_object(model_or_queryset, default_object=None, **kwargs):
    """
    Reuse get_object_or_404 since the implementation supports both Model && queryset.
    Catch Http404 & return None
    """
    try:
        return get_object_or_404(model_or_queryset, **kwargs)
    except Http404:
        return default_object
