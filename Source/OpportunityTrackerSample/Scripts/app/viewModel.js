app.viewModel = (function (logger, dataservice) {

    var suspendItemSave = false;


    var vm = {
        newRep: ko.observable(),
        newContact: ko.observable(""),
        repCollection: ko.observableArray([]),
        addRep: addRep,
        updateRep: updateRep,
        activateRep: activateRep,
        deleteRep: deleteRep,
        deleteContact: deleteContact,
        newOpp: ko.observable(),
        edit: edit,
        completeEdit: completeEdit,
        loadingComplete: ko.observable(false)
        //        ,
        //        addOpp: addOpp,
        //        updateOpp: updateOpp,
        //        activateOpp: activateOpp,
        //        deletOpp: deleteOpp

    };

    function repModel(id, contacts, events, opportunities, entityAspect) {
        this.ID = ko.observable(id || "");
        //this.isEditing = ko.observable(isEditing);
        this.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function (contact) {
            var _contact = new contactModel(contact.FirstName, contact.LastName, contact.ContactInfo, contact.entityAspect);
            extendItem(_contact);
            return _contact;
        }));
        this.events = ko.observableArray(events);
        this.opportunities = ko.observableArray(opportunities);
        this.entityAspect = ko.observable(entityAspect);

    }


    function contactModel(FirstName, LastName, contactInfo, entityAspect) {
        this.isEditing = ko.observable(false);
        this.FirstName = ko.observable(FirstName || "");
        this.LastName = ko.observable(LastName || "");
        this.fullname = ko.computed(function () {
            return this.FirstName() + " " + this.LastName();
        }, this);
        this.contactInfo = ko.observableArray(ko.utils.arrayMap(contactInfo, function (info) {
            var _info = new contactInfoModel(info.ID, info.Category, info.Value, info.entityAspect);
            extendItem(_info);
            return _info;
        }));
        this.entityAspect = ko.observable(entityAspect);


    }

    function contactInfoModel(id, category, value, entityAspect) {
        this.id = ko.observable(id);
        this.category = ko.observable(category);
        this.value = ko.observable(value);
        this.entityAspect = ko.observable(entityAspect);
    }

    ///TODO: Need models for Events and Opportunties, as well, or else need more test data to fill out data scaffolding

    initVM();

    return vm;


    function edit(item) {
        logger.info("Now editting", "viewModel");

        this.isEditing(true);

    }

    function completeEdit(item) {
        logger.info("Editting complete", "viewModel");

        this.isEditing(false);

    }

    function loadingStatus(status) {

        if (status) {
            vm.loadingComplete(status);
        }
    }

    function initVM() {
        getReps_DS();
        //        vm.repCollection = ko.util.arrayMap(testData, function (rep) {
        //            extendItem(rep);
        //            return new repModel(false, rep.ID, rep.Contacts, rep.Events, rep.Opportunities);
        //        });
    }

    function getReps_DS() {
        dataservice.getReps()
					.then(querySuccess)
					.fail(queryFail);
    }



    function querySuccess(data) {

        //ko.utils.arrayForEach(data.XHR.responseJSON, function (rep) {
        //console.log(rep);
        data.results.forEach(function (rep) {
            var newRep = new repModel(rep.ID(), rep.Contacts(), rep.Events(), rep.Opportunities(), rep.entityAspect);
            extendItem(rep);
            vm.repCollection.push(rep);
        });
        vm.loadingComplete(true);
        logger.info("dataservice returned successfully");
    }

    function queryFail(error) {
        logger.error(error.message, "Query failed");
    }

    function newContact(data) {
        var str = data.split(" ");
        contactModel(data[0] || "Johnny", data[1] || "Test");
    }

    function addRep(data) {


        var newRep = dataservice.addRep(
			new repModel(null, [new contactModel(data)], [], []));
        //            {
        //			Contact: function () {
        //				var data = vm.newContact();
        //				var str = data.split(" ");
        //				return new contactModel(data[0] || "Johnny", data[1] || "Test");
        //			}
        //		});
        extendItem(newRep);
        vm.repCollection().push(newRep);
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
        if (typeof(item.entityAspect) === 'function') {
            item.entityAspect().propertyChanged.subscribe(function () {
                if (suspendItemSave) { return; }
                // give EntityManager time to hear the change
                setTimeout(saveIfModified, 0);

                function saveIfModified() {
                    if (item.entityAspect().entityState.isModified()) {
                        dataservice.saveChanges();
                    }
                }
            });
        }
        else{
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
    }




})(app.logger, app.dataservice);

ko.bindingHandlers.jqTabs = {
	init: function (element, valueAccessor) {
		var options = valueAccessor() || {};
		$(element).tabs(options);
	},

	update: function (element, valueAccessor, allBindingsAccessor) {
		var dependency = ko.utils.unwrapObservable(valueAccessor()),
		   currentIndex = $(element).tabs("option", "selected") || 0,
		   config = ko.utils.unwrapObservable(allBindingsAccessor().jqTabOptions) || {};

		//make sure that elements are set from template before calling tabs API
		setTimeout(function () {
			$(element).tabs("destroy").tabs(config).tabs("option", "selected", currentIndex);
		}, 0);
	}
};

ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.visible.update(element, function () { return !value; });
    }
};





// Bind viewModel to view in index.html
ko.applyBindings(app.viewModel);