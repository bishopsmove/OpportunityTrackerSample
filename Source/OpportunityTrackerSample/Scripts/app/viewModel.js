app.viewModel = (function (logger, dataservice) {

	var suspendItemSave = false;

//	var testData = [{
//		"$id": "1",
//		"$type": "OpportunityTrackerSample.Models.Representative, OpportunityTrackerSample",
//		"ID": 1,
//		"CreateDate": "2013-04-03T14:31:00.000",
//		"ModifiedDate": "2013-04-03T14:31:00.000",
//		"Contacts": [{
//			"$id": "2",
//			"$type": "OpportunityTrackerSample.Models.Contact, OpportunityTrackerSample",
//			"ID": 1,
//			"LastName": "Smith",
//			"FirstName": "Joe",
//			"CreateDate": "2013-04-03T14:31:00.000",
//			"ModifiedDate": "2013-04-03T14:31:00.000",
//			"ContactInfo": [{
//				"$id": "3",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 1,
//				"Category": "email",
//				"Value": "joe.smith@test.com",
//				"CreateDate": "2013-04-03T14:31:00.000",
//				"ModifiedDate": "2013-04-03T14:31:00.000"
//			}, {
//				"$id": "4",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 2,
//				"Category": "phone",
//				"Value": "6785551234",
//				"CreateDate": "2013-04-03T14:31:00.000",
//				"ModifiedDate": "2013-04-03T14:31:00.000"
//			}]
//		}],
//		"Events": [],
//		"Opportunities": []
//	}, {
//		"$id": "5",
//		"$type": "OpportunityTrackerSample.Models.Representative, OpportunityTrackerSample",
//		"ID": 2,
//		"CreateDate": "2013-04-03T14:32:00.000",
//		"ModifiedDate": "2013-04-03T14:32:00.000",
//		"Contacts": [{
//			"$id": "6",
//			"$type": "OpportunityTrackerSample.Models.Contact, OpportunityTrackerSample",
//			"ID": 2,
//			"LastName": "Smeeth",
//			"FirstName": "Walter",
//			"CreateDate": "2013-04-03T14:32:00.000",
//			"ModifiedDate": "2013-04-03T14:32:00.000",
//			"ContactInfo": [{
//				"$id": "7",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 3,
//				"Category": "email",
//				"Value": "smeethw@test.org",
//				"CreateDate": "2013-04-03T14:32:00.000",
//				"ModifiedDate": "2013-04-03T14:32:00.000"
//			}, {
//				"$id": "8",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 4,
//				"Category": "phone",
//				"Value": "4045551234",
//				"CreateDate": "2013-04-03T14:32:00.000",
//				"ModifiedDate": "2013-04-03T14:32:00.000"
//			}]
//		}],
//		"Events": [],
//		"Opportunities": []
//	}, {
//		"$id": "9",
//		"$type": "OpportunityTrackerSample.Models.Representative, OpportunityTrackerSample",
//		"ID": 3,
//		"CreateDate": "2013-04-03T14:33:00.000",
//		"ModifiedDate": "2013-04-03T14:33:00.000",
//		"Contacts": [{
//			"$id": "10",
//			"$type": "OpportunityTrackerSample.Models.Contact, OpportunityTrackerSample",
//			"ID": 3,
//			"LastName": "Smythe",
//			"FirstName": "Leslie",
//			"CreateDate": "2013-04-03T14:33:00.000",
//			"ModifiedDate": "2013-04-03T14:33:00.000",
//			"ContactInfo": [{
//				"$id": "11",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 5,
//				"Category": "email",
//				"Value": "leslie@test.net",
//				"CreateDate": "2013-04-03T14:33:00.000",
//				"ModifiedDate": "2013-04-03T14:33:00.000"
//			}, {
//				"$id": "12",
//				"$type": "OpportunityTrackerSample.Models.ContactInfo, OpportunityTrackerSample",
//				"ID": 6,
//				"Category": "phone",
//				"Value": "7705551234",
//				"CreateDate": "2013-04-03T14:33:00.000",
//				"ModifiedDate": "2013-04-03T14:33:00.000"
//			}]
//		}],
//		"Events": [],
//		"Opportunities": []
//	}];

	var vm = {
		newRep: ko.observable(),
		newContact: ko.observable(newContact()),
		repCollection: ko.observableArray([]),
		addRep: addRep,
		updateRep: updateRep,
		activateRep: activateRep,
		deleteRep: deleteRep,
		deleteContact: deleteContact,
		newOpp: ko.observable(),
		edit: edit
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
			return new contactModel(contact.FirstName, contact.LastName);
		}));
		this.events = ko.observableArray(events);
		this.opportunities = ko.observableArray(opportunities);
	}


	function contactModel(FirstName, LastName) {
		this.isEditing = ko.observable(false);
		this.FirstName = ko.observable(FirstName || "");
		this.LastName = ko.observable(LastName || "");
		this.fullname = ko.computed(function () {
			return this.FirstName() + " " + this.LastName();
		}, this);
		this.editContact = function (item) {
			edit(item);
		};
		this.completeEditContact = function (item) {
		    completeEdit(item);
		};

	}

	///TODO: Need models for Events and Opportunties, as well, or else need more test data to fill out data scaffolding

	initVM();

	return vm;

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
		
		ko.utils.arrayForEach(data.XHR.responseJSON, function (rep) {
			//console.log(rep);
			vm.repCollection.push(new repModel(false, rep.ID, rep.Contacts, rep.Events, rep.Opportunities));
		});
		//console.log(vm.repCollection().length);

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

// Bind viewModel to view in index.html
ko.applyBindings(app.viewModel);