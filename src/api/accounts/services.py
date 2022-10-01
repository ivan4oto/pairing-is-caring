from accounts.models import Account
from accounts.utils import get_object
from main.models import PairingSession

from common.services import model_update

def account_update(*, account, data):
    pairing_session = get_object(PairingSession, pk = data.get('id'))
    data['pairing_session'] = pairing_session if pairing_session else PairingSession(**data.get('pairing_session'))
    fields = ['pairing_session', 'is_active']
    account, has_updated = model_update(instance=account, fields=fields, data=data)
    return account

def account_create(*, email, username, password, pairing_session=None):
    obj = Account(email=email, username=username, pairing_session=pairing_session)
    obj.set_password(password)
    obj.full_clean()
    obj.save()

    return obj