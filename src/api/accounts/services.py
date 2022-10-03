from accounts.models import Account
from accounts.utils import get_object
from main.models import PairingGroup, PairingSession

from common.services import model_update

def account_update(*, account, data):
    pairing_session = get_object(PairingSession, pk = data.get('id'))
    pairing_group = get_object(PairingGroup, pk = data.get('id'))
    data['pairing_session'] = pairing_session if pairing_session else PairingSession(**data.get('pairing_session'))
    print(data)
    data['pairing_group'] = pairing_group if pairing_group else PairingGroup(**data.get('pairing_group'))
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