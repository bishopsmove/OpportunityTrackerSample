app.viewModel = (function (dataservice) {

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

    var contactModel = function(){
        
    }

    function initVM(){
        
    }

    function getReps_DS() {

    }

    function querySuccess(data) {
        vm.repCollection([]);

        data.results.forEach(function (item) {
            extendItem(item);
            vm.repCollection.push(item);

        });

        //logger entry
    }

    function queryFail(error) {
        //logger entry
    }

    function addRep() {

        var newRep = dataservice.createRep({
            Contact: dataservice.newContact()
        });
    }

    function updateRep() {
        
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

});