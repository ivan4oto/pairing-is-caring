def model_update(*, instance, fields, data):
    """
    Generic update service meant to be reused in local update services
    For example:
    def user_update(*, user: User, data) -> User:
        fields = ['first_name', 'last_name']
        user, has_updated = model_update(instance=user, fields=fields, data=data)
        // Do other actions with the user here
        return user
    Return value: Tuple with the following elements:
        1. The instance we updated
        2. A boolean value representing whether we performed an update or not.
    """
    has_updated = False

    for field in fields:
        # Skip if a field is not present in the actual data
        if field not in data:
            continue

        if getattr(instance, field) != data[field]:
            has_updated = True
            setattr(instance, field, data[field])

    # Perform an update only if any of the fields was actually changed
    if has_updated:
        instance.full_clean()
        instance.save(update_fields=fields)

    return instance, has_updated