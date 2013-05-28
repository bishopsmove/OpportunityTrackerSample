app.dataservice = (function (breeze, logger) {

    var serviceName = 'breeze/data'; // route to the same origin Web Api controller

    // *** Cross origin service example  ***
    //var serviceName = 'http://localhost:6550/breeze/data'; // controller in different origin

    var manager = new breeze.EntityManager(serviceName);
    manager.enableSaveQueuing(true);


    return {

        getReps: getReps,
        addRep: addRep,
        updateRep: updateRep,
        activateRep: activateRep,
        deleteRep: deleteRep,
        addOrg: addOrg,
        addOpp: addOpp,
        updateOpp: updateOpp,
        activateOpp: activateOpp,
        deletOpp: deleteOpp,
        newContact: newContact,
        addContact: addContact,
        updateContact: updateContact,
        activateContact: activateContact,
        deleteContact: deleteContact,
        addContactInfo: addContactInfo,
        getContactCategories: getContactCategories,
        saveChanges: saveChanges

    };

    function getReps() {

        var query = breeze.EntityQuery
                .from('Representatives')
                .expand('Contacts, Opportunities, Events, Organization');


        return manager.executeQuery(query);
    }

    function addRep(data) {
        return manager.createEntity("Representative", data);
    }

    function updateRep(data) {

    }

    function activateRep(data, activate) {

    }

    function deleteRep(data) {

    }

    function addOrg(data) {
        return manager.createEntity("Organization", data);

    }

    function newContact() {
        return {
            firstName: ko.observable("Johnny"),
            lastName: ko.observable("Test")

        };
    }

    function addContact(data) {
        return manager.createEntity("Contact", data);
    }

    function updateContact(data) {


    }

    function activateContact(data, activate) {

    }

    function deleteContact(data) {

    }

        
    function addContactInfo(data) {
        return manager.createEntity("ContactInfo", data);
    }

    function addOpp(data) {

    }

    function updateOpp(data) {

    }

    function activateOpp(data, activate) {

    }

    function deleteOpp(data) {

    }

    function getContactCategories() {

        var query = breeze.EntityQuery
                    .from("ContactCategories");

        return manager.executeQuery(query);
    }

    /*
    Following section taken from Breeze ToDo sample as it is fairly utilitarian in scope

    */

    function saveChanges() {
        return manager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed);

        function saveSucceeded(saveResult) {
            //logger.success("# of Todos saved = " + saveResult.entities.length);
            if (saveResult.entities.length > 0) {
                logger.info("Changes saved for RepID " + saveResult.entities[0].ID());
            }
        }

        function saveFailed(error) {
            var reason = error.message;
            var detail = error.detail;

            if (reason === "Validation error") {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the Reps." +
                    " You may have to restart the app.";
            } else {
                reason = "Failed to save changes: " + reason +
                         " You may have to restart the app.";
            }

            logger.error(error, reason);
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            setTimeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }
    }

    function handleSaveValidationError(error) {
        var message = "Not saved due to validation error";
        try { // fish out the first error
            var firstErr = error.entitiesWithErrors[0].entityAspect.getValidationErrors()[0];
            message += ": " + firstErr.errorMessage;
        } catch (e) { /* eat it for now */ }
        return message;
    }

})(breeze, app.logger);