from accounts.models import Account


def account_create(*, email, username, password, pairing_session=None):
    obj = Account(email=email, username=username, pairing_session=pairing_session)
    obj.set_password(password)
    obj.full_clean()
    obj.save()

    return obj

def account_list(group_name=None):
    if group_name:
        return Account.objects.filter(pairing_group__name=group_name).all()
    return Account.objects.all()