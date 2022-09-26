from accounts.models import Account


def get_athletes_in_this_session(session_id):
    return Account.objects.filter(
        pairing_session__id=session_id
    ).all()