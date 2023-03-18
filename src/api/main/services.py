from accounts.models import Account
from main.models import PairingGroup, PairingSession


def get_accounts_in_session(session_id):
    return Account.objects.filter(
        pairing_session__id=session_id
    ).all()

def group_create(*, name, createdBy, ownedBy):
    obj = PairingGroup(name=name, createdBy=createdBy, ownedBy=ownedBy)
    obj.full_clean()
    obj.save()

    return obj

def create_new_session(data):
    session = PairingSession()
    session.start_time = data.get('start_time')
    session.save()
    return session

def session_create(*, start_time):
    obj = PairingSession(start_time=start_time)

    obj.full_clean()
    obj.save()

    return obj