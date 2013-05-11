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
		newOpp: ko.observable(),
		edit: edit,
		completeEdit: completeEdit
		//        ,
		//        addOpp: addOpp,
		//        updateOpp: updateOpp,
		//        activateOpp: activateOpp,
		//        deletOpp: deleteOpp

	};

	function repModel(isEditing, id, contacts, events, opportunities) {
		this.ID = ko.observable(id);
		this.isEditing = ko.observable(isEditing);
		this.contacts = ko.observableArray(ko.utils.arrayMap(contacts, function (contact) {
			return new contactModel(contact.FirstName, contact.LastName, contact.ContactInfo);
		}));
		this.events = ko.observableArray(events);
		this.opportunities = ko.observableArray(opportunities);
//		this.edit = function (item) {
//			if (item) {

//			    logger.info("Now editting", "repModel");
//			    item.isEditing(true);
//			}
//		};
//		this.completeEdit = function (item) {
//			if (item) {

//			    logger.info("Finished editting", "repModel");
//			    item.isEditing(false);
//				}
//		};
	}


	function contactModel(FirstName, LastName, contactInfo) {
		this.isEditing = ko.observable(false);
		this.FirstName = ko.observable(FirstName || "");
		this.LastName = ko.observable(LastName || "");
		this.fullname = ko.computed(function () {
			return this.FirstName() + " " + this.LastName();
		}, this);
		this.contactInfo = ko.observableArray(ko.utils.arrayMap(contactInfo, function (info) {
			return new contactInfoModel(info.ID, info.Category, info.Value);
		}));
		

	}

	function contactInfoModel(id, category, value) {
		this.id = ko.observable(id);
		this.category = ko.observable(category);
		this.value = ko.observable(value);
		this.isEditing = ko.observable(false);
	}

	///TODO: Need models for Events and Opportunties, as well, or else need more test data to fill out data scaffolding

	initVM();

	return vm;

	//    vm.prototype = {
	//        edit: function (item) {
	//            if (item) { item.isEditing(true); }
	//        },

	//        completeEdit: function (item) {
	//            if (item) { item.isEditing(false); }
	//        }
	//    }

		function edit(item) {
			logger.info("Now editting", "viewModel");
			item.isEditing(true);
		}

		function completeEdit(item) {
			logger.info("Editting complete", "viewModel");
			item.isEditing(false);
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