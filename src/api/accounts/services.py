from accounts.models import Account
from common.services import model_update

def account_update(*, account, data):
    fields = ['pairing_session', 'pairing_group', 'is_active']
    account, has_updated = model_update(instance=account, fields=fields, data=data)
    return account

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