from accounts.models import Account
from main.models import PairingGroup


def get_athletes_in_this_session(session_id):
    return Account.objects.filter(
        pairing_session__id=session_id
    ).all()

def group_create(*, name, createdBy, ownedBy):
    obj = PairingGroup(name=name, createdBy=createdBy, ownedBy=ownedBy)
    obj.full_clean()
    obj.save()

    return obj