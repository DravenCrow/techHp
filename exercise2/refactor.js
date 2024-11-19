
async function updateUserAndShop(authId, email, shop, invitationId) {
    //update or create user
    const user = await User.findOneAndUpdate( { authId }, { authId, email }, { upsert: true, new: true });

    //update shop
    if (shop.users.indexOf(user._id) === -1) {
        shop.users.push(user._id);
    }
    if (shop.invitations.indexOf(invitationId) === -1) {
        shop.invitations.push(invitationId);
    }
    await shop.save();
}

async function getShop(shopId) {
    try {
        const shop = await Shop.findById(shopId);
    if (!shop) {
        return null;
    }
        return shop;
    } catch (error) {
        return null;
    }
}

exports.inviteUser = async function (req, res) {

    var invitationBody = req.body;
    // check if req.body is valid
    if (!invitationBody.email) {
        res.status(400).json({ error: true, message: 'Email in invitation body is required' });
        return;
    }
    // check if req.params is valid
    if (!req.params.shopId) {
        res.status(400).json({ error: true, message: 'Shop Id is required' });
        return;
    }

    // Checking if shop exists
    let shop = await getShop(req.params.shopId);
    if (shop === null) {
        res.status(500).json({ error: true, message: 'shop not found' });
        return;
    }

    // Inviting user to auth system
    let invitationResponse = null;
    try {
        const invitationResponse = await superagent.post(authUrl).send(invitationBody);
        if (!invitationResponse) {
            res.status(500).json({ error: true, message: 'Error inviting user' });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error inviting user' });
        return;
    }

    // processing response from auth system and updating user and shop
    try {
        if (invitationResponse.status === 201) {
            //check if invinvitationResponseitationResponse is valid
            if (!invitationResponse.body || !invitationResponse.body.authId || !invitationResponse.body.invitationId) {
                res.status(500).json({ error: true, message: 'Invalid invitationResponse properties' });
                return;
            }
            
            await updateUserAndShop(invitationResponse.body.authId, invitationBody.email, shop, invitationResponse.body.invitationId);
        } else if (invitationResponse.status === 200) {
            res.status(409).json({ error: true, message: 'User already invited to this shop' });
            return;
        } else {
            //another status code will be propagated to the response. ??? I don't understand this behavior.
            res.json(invitationResponse);
        }
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error processing response from auth system and updating user and shop' });
        return;
    }
};