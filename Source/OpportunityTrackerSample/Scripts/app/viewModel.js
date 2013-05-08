app.viewModel = (function (logger, dataservice) {

    var suspendItemSave = false;

    var vm = {
        newRep: ko.observable(),
        newContact: ko.observable(newContact()),
        repCollection: ko.observableArray([]),
        addRep: addRep,
        updateRep: updateRep,
        activateRep: activateRep,
        deleteRep: deleteRep,
        deleteContact: deleteContact,
        newOpp: ko.observable()
        //        ,
        //        addOpp: addOpp,
        //        updateOpp: updateOpp,
        //        activateOpp: activateOpp,
        //        deletOpp: deleteOpp

    };

    function repModel(isEditing, id, contacts, events, opportunities) {
        this.ID = ko.observable(id);
        this.IsEditing = ko.observable(isEditing);
        this.contacts = ko.observableArray(contacts);
        this.events = ko.observableArray(events);
        this.opportunities = ko.observableArray(opportunities);
    }


    //    var contactModel = ko.observable(dataservice.newContact());

    //    contactModel.fullname = ko.dependentObservable(function () {
    //        return this.firstName() + " " + this.lastName();
    //    }, contractModel);

    initVM();

    return vm;

    function initVM() {
        getReps_DS();
    }

    function getReps_DS() {
        dataservice.getReps()
                    .then(querySuccess)
                    .fail(queryFail);
    }



    function querySuccess(data) {
        //vm.repCollection([]);

        data.results.forEach(function (item) {
            extendItem(item);
            vm.repCollection.push(new repModel(item.isEditing, item.ID, item.Contacts, item.Events, item.Opportunities));

        });

        logger.info("dataservice returned successfully");
    }

    function queryFail(error) {
        logger.error(error.message, "Query failed");
    }

    function newContact() {
        var data = dataservice.newContact();
        data.fullname = ko.dependentObservable(function () {

            return this.firstName() + " " + this.lastName();
        }, data);
        return data;
    }

    function addRep(data) {

        var newRep = dataservice.createRep({
            Contact: data
        });
    }

    function updateRep(data) {

    }

    function activateRep(data, activate) {

    }

    function deleteRep(data) {

    }

    function deleteContact(data) {

    }

    //Pulled from BreezeJS ToDo sample, good utilitarian pattern
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

    function edit(item) {
        if (item) { item.isEditing(true); }
    }
    function completeEdit(item) {
        if (item) { item.isEditing(false); }
    }

})(app.logger, app.dataservice);

// Bind viewModel to view in index.html
ko.applyBindings(app.viewModel);