app.viewModel = (function (logger, dataservice) {

    var suspendItemSave = false;


    var vm = {

        newEntry: newEntry,
        newEntryText: ko.observable(),
        newRepType: ko.observable(false),
        repCollection: ko.observableArray([]),
        addRep: addRep,
        activateRep: activateRep,
        deleteRep: deleteRep,
        deleteContact: deleteContact,
        newOpp: ko.observable(),
        edit: edit,
        completeEdit: completeEdit,
        loadingComplete: ko.observable(false),
        addContact: addContact,
        addContactInfo: addContactInfo,
        contactCategories: ko.observableArray()
        //        ,
        //        addOpp: addOpp,
        //        activateOpp: activateOpp,
        //        deletOpp: deleteOpp

    };



    ///TODO: Need models for Events and Opportunties, as well, or else need more test data to fill out data scaffolding

    initVM();

    return vm;


    function edit(item) {
        logger.info("Now editting", "viewModel");

        this.isEditing(true);

    }

    function completeEdit(item) {
        logger.info("Editting complete", "viewModel");
        dataservice.saveChanges();
        this.isEditing(false);

    }

    function newEntry(data) {

        if (data === "undefined") return;
        var entryText = data[3].value;
        if (vm.newRepType()) {
            addRep(entryText);
        }
        else {
            addRepContact(entryText);
        }
        dataservice.saveChanges();
        vm.newEntryText("");
        vm.newRepType(false);
    }

    function loadingStatus(status) {

        if (status) {
            vm.loadingComplete(status);
        }
    }

    function initVM() {
        getContactCategories_DS();
        getReps_DS();


    }

    function getReps_DS() {
        dataservice.getReps()
					.then(querySuccess)
					.fail(queryFail);
    }



    function querySuccess(data) {


        data.results.forEach(function (rep) {

            extendItem(rep);
            if (rep.Organization() === null) {
                rep.Organization = dataservice.addOrg({ Name: rep.Contacts()[0].LastName(), ID: rep.ID(), Address: "" });
                dataservice.saveChanges();
            }
            vm.repCollection.push(rep);
        });
        vm.loadingComplete(true);
        logger.info("Representatives returned successfully");
    }

    function queryFail(error) {
        logger.error(error.message, "Query failed");
    }

    function getContactCategories_DS() {
        dataservice.getContactCategories()
		.then(cc_Success)
		.fail(queryFail);
    }

    function cc_Success(data) {
        vm.contactCategories.push(data.XHR.responseJSON);

        logger.info("ContactCategories returned successfully");
    }

    /*
    This is specific to creating a Rep and a Contact all at once
    */
    function addRepContact(data) {
        var str = data.split(" ");
        var firstName = data[0] || "Johnny";
        var maxLength = data.length;
        var lastName = data[maxLength - 1] || "Test";
        var newRep = dataservice.addRep({ Rating: 0 });
        newRep.Contacts.push(dataservice.addContact({ FirstName: firstName, LastName: lastName }));
        extendItem(newRep);
        vm.repCollection.push(newRep);

    }

    function addRep(data) {


        var newRep = dataservice.addRep({ Rating: 0 });
        newRep.Organization = dataservice.addOrg({ ID: newRep.ID(), Name: data, Address: "" });
        extendItem(newRep);
        vm.repCollection().push(newRep);
    }


    function activateRep(data, activate) {

    }

    function deleteRep(data) {

    }

    /*
    This is specific to adding a Contact to existing Rep
    */
    function addContact(data) {
        var entry = data[1].value.split(" ");
        var index = parseInt(data[2].value);
        var firstName = entry[0];
        var maxLength = entry.length;
        var lastName = entry[maxLength - 1]
        vm.repCollection()[index].Contacts().push(dataservice.addContact({ FirstName: firstName, LastName: lastName }));
        dataservice.saveChanges();
        rep.newContact(false);
    }

    function deleteContact(data) {

    }

    function addContactInfo(data) {

        data.ContactInfo.push(dataservice.addContactInfo({ Value: "" }));
        dataservice.saveChanges();
    }

    //Pulled from BreezeJS ToDo sample, good utilitarian pattern
    function extendItem(item) {
        if (item.isEditing) return; // already extended

        //hook these observables to specific events/conditions, but they don't go back to the Repo
        item.isEditing = ko.observable(false);
        item.newContact = ko.observable(false);
        item.newOpp = ko.observable(false);
        item.newEvent = ko.observable(false);

        // listen for changes with Breeze PropertyChanged event
        if (typeof (item.entityAspect) === 'function') {
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
        else {
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

//Thanks to rniemeyer for the rating binding bit & jquery.raty for star css and images
ko.bindingHandlers.starRating = {
    init: function (element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
            $("<span>").appendTo(element);

        // Handle mouse events on the stars
        $("span", element).each(function (index) {
            $(this).hover(
                function () { $(this).prevAll().add(this).addClass("hoverChosen") },
                function () { $(this).prevAll().add(this).removeClass("hoverChosen") }
            ).click(function () {
                var observable = valueAccessor();  // Get the associated observable
                observable(index + 1);               // Write the new rating to it
            });
        });

        


    },
    update: function (element, valueAccessor) {
        // Give the first x stars the "chosen" class, where x <= rating
        var observable = valueAccessor();
        $("span", element).each(function (index) {
            $(this).toggleClass("chosen", index < observable());
        });
    }
};

//ko.bindingHandler.modal = {

//    init: function (element, valueAccesor) {
//        var options = valueAccesor() || {};
//        $(element).dialog(options);
//    },
//    update: function (element, valueAccessor) {
//        var value = ko.utils.unwrapObservable(valueAccessor());
//        if (value) {
//            $(element).dialog("open");
//        } else {
//            $(element).dialog("close");
//        }

//    }
//};
ko.bindingHandlers.jqDialog = {
	init: function (element, valueAccessor) {
		var options = ko.utils.unwrapObservable(valueAccessor()) || {};

		//handle disposal
		ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
			$(element).dialog("destroy");
		});

		$(element).dialog(options);
	}
};

ko.bindingHandlers.openDialog = {
	update: function (element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		if (value) {
			$(element).dialog("open");
		} else {
			$(element).dialog("close");
		}
	}
}

ko.bindingHandlers.hidden = {
	update: function (element, valueAccessor) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		ko.bindingHandlers.visible.update(element, function () { return !value; });
	}
};





// Bind viewModel to view in index.html
ko.applyBindings(app.viewModel);