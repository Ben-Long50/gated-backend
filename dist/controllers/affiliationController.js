import upload from '../utils/multer.js';
import affiliationServices from '../services/affiliationServices.js';
function validateAffiliation(primaryId, parsedBody) {
    var _a, _b, _c;
    const affiliationIds = [
        primaryId,
        (_a = parsedBody.faction) === null || _a === void 0 ? void 0 : _a.id,
        (_b = parsedBody.gang) === null || _b === void 0 ? void 0 : _b.id,
        (_c = parsedBody.character) === null || _c === void 0 ? void 0 : _c.id,
    ].filter((id) => !!id);
    //Make sure there are not more than 2 entities involved in the new affiliation
    if (affiliationIds.length > 2) {
        throw new Error('There are too many entities involved in this affiliation. Only two entities are allowed');
    }
    //Make sure there are not less than 2 entities involved in the new affiliation
    if (affiliationIds.length < 2) {
        throw new Error('There are not enought entities involved in this affiliation. Only two entities are allowed');
    }
    return;
}
const affiliationController = {
    getAffiliationById: async (req, res) => {
        try {
            const affiliation = await affiliationServices.getAffiliationById(Number(req.params.affiliationId));
            res.status(200).json(affiliation);
        }
        catch (error) {
            console.error(error.message);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getBatchAffiliations: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const affiliationIds = req.query.ids.split(',').map(Number);
            const affiliations = await affiliationServices.getBatchAffiliations(affiliationIds);
            res.status(200).json(affiliations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createFactionAffiliation: [
        upload.none(),
        async (req, res) => {
            try {
                const parsedBody = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [
                    key,
                    JSON.parse(value),
                ]));
                validateAffiliation(Number(req.params.factionId), parsedBody);
                await affiliationServices.createFactionAffiliation(Number(req.params.factionId), parsedBody);
                res
                    .status(200)
                    .json({ message: 'Successfully created faction affiliation' });
            }
            catch (error) {
                console.error(error.message);
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    createGangAffiliation: [
        upload.none(),
        async (req, res) => {
            try {
                const parsedBody = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [
                    key,
                    JSON.parse(value),
                ]));
                validateAffiliation(Number(req.params.gangId), parsedBody);
                await affiliationServices.createGangAffiliation(Number(req.params.gangId), parsedBody);
                res
                    .status(200)
                    .json({ message: 'Successfully created gang affiliation' });
            }
            catch (error) {
                console.error(error.message);
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    createCharacterAffiliation: [
        upload.none(),
        async (req, res) => {
            try {
                const parsedBody = Object.fromEntries(Object.entries(req.body).map(([key, value]) => [
                    key,
                    JSON.parse(value),
                ]));
                validateAffiliation(Number(req.params.characterId), parsedBody);
                await affiliationServices.createCharacterAffiliation(Number(req.params.characterId), parsedBody);
                res
                    .status(200)
                    .json({ message: 'Successfully created character affiliation' });
            }
            catch (error) {
                console.error(error.message);
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    updateAffiliationValue: async (req, res) => {
        try {
            await affiliationServices.updateAffiliationValue(Number(req.params.affiliationId), req.body.value);
            res
                .status(200)
                .json({ message: 'Successfully updated affiliation value' });
        }
        catch (error) {
            console.error(error.message);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deleteAffiliation: async (req, res) => {
        try {
            await affiliationServices.deleteAffiliation(Number(req.params.affiliationId));
            res.status(200).json({ message: 'Successfully deleted affiliation' });
        }
        catch (error) {
            console.error(error.message);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default affiliationController;
