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
        this.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function (contact) {
            return new contactModel(contact.firstName, contact.lastName);
        }));
        this.events = ko.observableArray(events);
        this.opportunities = ko.observableArray(opportunities);
    }


    function contactModel(firstName, lastName) {

        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        this.fullname = ko.computed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);

    }

    ///TODO: Need models for Events and Opportunties, as well, or else need more test data to fill out data scaffolding

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

        //        data.results.forEach(function (item) {
        //            extendItem(item);
        //            vm.repCollection.push(new repModel(item.isEditing, item.ID, item.Contacts, item.Events, item.Opportunities));

        //        });
        //var reps = ko.utils.parseJson(data.XHR.responseText);
        vm.repCollection = ko.util.arrayMap(ko.mapping.fromJS(data.XHR.responseJSON), function (rep) {
            extendItem(rep);
            return new repModel(false, rep.ID, rep.Contacts, rep.Events, rep.Opportunities);
        });

        logger.info("dataservice returned successfully");
    }

    function queryFail(error) {
        logger.error(error.message, "Query failed");
    }

    function newContact() {
        return new contactModel("Johnny", "Test");
    }

    function addRep(data) {

        var newRep = dataservice.createRep({
            Contact: function (data) {
                return new contactModel(data.firstName, data.lastName);
            }
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