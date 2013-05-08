app.viewModel = (function (logger, dataservice) {

    var vm = {
        newRep: ko.observable(),
        newContact: ko.observable(),
        repCollection: ko.observableArray(),
        addRep: addRep,
        updateRep: updateRep,
        activateRep: activateRep,
        deleteRep: deleteRep,
        newOpp: ko.observable(),
        addOpp: addOpp,
        updateOpp: updateOpp,
        activateOpp: activateOpp,
        deletOpp: deleteOpp

    };

    //var contactModel = ko.observable(dataservice.newContact());

    function initVM() {

    }

    function getReps_DS() {
        dataservice.getReps()
                    .then(querySuccess)
                    .fail(queryFail);
    }

    function querySuccess(data) {
        vm.repCollection([]);

        data.results.forEach(function (item) {
            extendItem(item);
            vm.repCollection.push(item);

        });

        logger.info("dataservice returned successfully");
    }

    function queryFail(error) {
        logger.error(error.message, "Query failed");
    }

    function newContact() {
        return dataservice.newContact();
    }

    function addRep(data) {

        var newRep = dataservice.createRep({
            Contact: data
        });
    }

    function updateRep(data) {
       
    }


    function extendItem(item) {
        if (item.isEditing) return; // already extended

        item.isEditing = ko.observable(false);

        // listen for changes with Breeze PropertyChanged event
        item.entityAspect.propertyChanged.subscribe(function () {
            if (suspendItemSave) { return; }
            // give EntityManager time to hear the change
            setTimeout(saveIfModified, 0);

            function saveIfModified() {
                if (item.entityAspect.entityState.isModified()) {
                    dataservice.saveChanges();
                }
            }
        });
    }

})(app.logger, app.dataservice);

// Bind viewModel to view in index.html
ko.applyBindings(app.viewModel);