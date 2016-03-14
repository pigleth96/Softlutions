'use strict';
var app = angular.module('dondeEs.myEvents', ['ngRoute', 'google-maps'])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/index', {
	    templateUrl: 'resources/myEvents/index.html',
	    controller: 'MyEventsCtrl'
	  });
	}]);

app.factory('MarkerCreatorService', function () {
    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                labelAnchor: "28 -5",
                labelClass: 'markerlabel' 
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                console.log("Google Maps no pudo encontrar la dirección.");
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
        	console.log("Google Maps no pudo encontrar su dirección.");
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});

app.controller('MyEventsCtrl', ['$scope','$http','$upload','MarkerCreatorService', function($scope,$http,$upload,MarkerCreatorService) { 
	$scope.listOfEmails = [];
	$scope.files = {};
	$scope.eventType = 0;
	$scope.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
	
	// Create auction
	$scope.catalogs = [];
	$scope.catalogServiceSelected = {};
	// --------------
	var form = $("#example-advanced-form").show();

	form.steps({
	    headerTag: "h3",
	    bodyTag: "fieldset",
	    transitionEffect: "slideLeft",
	    onStepChanging: function (event, currentIndex, newIndex)
	    {
	        if (currentIndex > newIndex)
	        {
	            return true;
	        }
	        if (newIndex === 3 && Number($("#age-2").val()) < 18)
	        {
	            return false;
	        }
	        if (currentIndex < newIndex)
	        {
	            form.find(".body:eq(" + newIndex + ") label.error").remove();
	            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
	        }
	        form.validate().settings.ignore = ":disabled,:hidden";
	        return form.valid();
	    },
	    onStepChanged: function (event, currentIndex, priorIndex)
	    {
	        if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
	        {
	            form.steps("next");
	        }
	        if (currentIndex === 2 && priorIndex === 3)
	        {
	            form.steps("previous");
	        }
	    },
	    onFinishing: function (event, currentIndex)
	    {
	        form.validate().settings.ignore = ":disabled";
	        return form.valid();
	    },
	    onFinished: function (event, currentIndex)
	    {
	        alert("Se publico el evento!");
	    }
	}).validate({
	    errorPlacement: function errorPlacement(error, element) { element.before(error); },
	    rules: {
	        confirm: {
	            equalTo: "#password-2"
	        }
	    }
	});
		
	$scope.listParticipants = function(eventId){
		$http.get('rest/protected/eventParticipant/getAllEventParticipants/'+eventId).success(function(response) {
			$scope.participants = response.eventParticipantsList;
		});

		$http.get('rest/protected/event/getAllEventByUser/'+$scope.loggedUser.userId).success(function(response) {
			$scope.events = response.eventList;
		});
	}
	
	$scope.auctionEventServices = function(event){
		$scope.selectedEvent = event;
	}
	
	$scope.createAuction = function(){
		
		var auction = {
				name: $('#auctionName').val(),
				description: $('#auctionDescription').val(),
				date: new Date(),
				event: $scope.selectedEvent
		}

		$http({method: 'POST',url:'rest/protected/auction/createAuction', data:auction, headers: {'Content-Type': 'application/json'}}).success(function(response) {
			$('#modalAuctionEventServices').modal('toggle');
			
		})	
	}
	
	$scope.listContracts = function(eventId){
	
		$http.get("rest/protected/serviceContact/getAllServiceContact/"+eventId).success(function(response){
				
				$scope.serviceContacts = response.listContracts;
				if($scope.serviceContacts.length == 0){
					$('#errorMessage').removeClass('hidden');
					$('#contractTable').addClass('hidden');
				}else{
					$('#contractTable').removeClass('hidden');
					$('#errorMessage').addClass('hidden');
				}
			});
	}

		$scope.listParticipants = function(eventId){
			$http.get('rest/protected/eventParticipant/getAllEventParticipants/'+eventId).success(function(response) {
				$scope.participants = response.eventParticipantsList;
			});
		}
		
		$scope.auctionEventServices = function(event){
			$scope.selectedEvent = event;
		}
		
		$scope.createAuction = function(){
			$("#btnCreateAuction").prop("disabled", true);
			
			var auction = {
					name: $('#auctionName').val(),
					description: $('#auctionDescription').val(),
					date: new Date(),
					event: $scope.selectedEvent,
					serviceCatalog: $scope.catalogServiceSelected
			}
			
			$http({method: 'POST',url:'rest/protected/auction/createAuction', data:auction, headers: {'Content-Type': 'application/json'}}).success(function(response) {
				$('#modalAuctionEventServices').modal('toggle');
				$("#btnCreateAuction").prop("disabled", false);
				$('#auctionName').val("");
				$('#auctionDescription').val("");
				$scope.catalogServiceSelected = {};
			})	
		}

	 $scope.geteventById = function(eventId){
		$scope.eventId = eventId;
	};

	$scope.addEmail = function(pemail){
		$scope.listOfEmails.push(pemail.to);
		pemail.to = "";
	}
	
	/*Al que ocupe notificar al que contrata
	 * $http.get({url:'rest/protected/sendEmail/sendEmailContractNotification/idAEnviar='}).success(function(response) {
	 * 	Lo que quieran hacer xD
	 * });
	 * 
	 * */
	
	$scope.deleteEvent = function(event){
		$scope.listOfEmails.splice($scope.listOfEmails.indexOf(event), 1);
	}
	$scope.sendEmail = function(event){
		var dataCreate = {
				listSimple:$scope.listOfEmails
		};
		if($scope.listOfEmails.length != 0){
			$("#modal-formSendInvitation").modal('hide');
			$http({method: 'POST',url:'rest/protected/sendEmail/sendEmailInvitation?eventId='+ $scope.eventId, data:dataCreate, headers: {'Content-Type': 'application/json'}}).success(function(response) {
				
			});
		};
	}
		
		$scope.selectCatalog = function(selectedCatalog){
			$scope.catalogServiceSelected = selectedCatalog;
		}
		
		$scope.addEmail = function(pemail){
			$scope.listOfEmails.push(pemail.to);
			pemail.to = "";
		}
		
		$scope.catalogsList = function(){
			if($scope.catalogs.length == 0){
				$http.get('rest/protected/serviceCatalog/getAllCatalogService').success(function(response) {
					$scope.catalogs = response.serviceCatalogList;
				});
			}
		}
		
		$scope.selectService = function(selectedService){
			var row = $("#serviceRow"+selectedService.serviceId);
			
			if(row.hasClass("selected-table-item")){
				row.removeClass("selected-table-item");
				
				var indexToRemove = -1;
				var i = 0;
				
				while(i < $scope.auctionServices.length && indexToRemove == -1){
					if($scope.auctionServices[i].service.serviceId == selectedService.serviceId){
						indexToRemove = i;
					}
					
					i++;
				}
				
				$scope.auctionServices.splice(indexToRemove, 1);
			}else{
				row.addClass("selected-table-item");
				var auctionService = {
						service: selectedService,
						description: '',
						date: new Date(),
						auction: null,
						price: 0,
						acept: 0	
				};
				
				$scope.auctionServices.push(auctionService);
			}
		}
		
		/*Al que ocupe notificar al que contrata
		 * $http.get({url:'rest/protected/sendEmail/sendEmailContractNotification/idAEnviar='}).success(function(response) {
		 * 	Lo que quieran hacer xD
		 * });
		 * 
		 * */
		
		$scope.deleteEvent = function(event){
			$scope.listOfEmails.splice($scope.listOfEmails.indexOf(event), 1);
		}
		
		$scope.sendEmail = function(event){
			var dataCreate = {
					listSimple:$scope.listOfEmails
			};
			if($scope.listOfEmails.length != 0){
				$("#modal-formSendInvitation").modal('hide');
				$http({method: 'POST',url:'rest/protected/sendEmail/sendEmailInvitation?eventId='+ $scope.eventId, data:dataCreate, headers: {'Content-Type': 'application/json'}}).success(function(response) {
					
				});
			}
		}
		
		$scope.publishEvent = function(eventId){  
			$scope.requestObject = {"eventId":eventId};
			$http.put('rest/protected/event/publishEvent',$scope.requestObject).success(function(response) {
					$http.get('rest/protected/event/getAllEventByUser/'+$scope.loggedUser.userId).success(function(response) {
						$scope.events = response.eventList;
					});
			})
			
		}

	
	$scope.cancelEvent = function(eventId){  
	 	$scope.requestObject = {"eventId":eventId};
	 	$http.put('rest/protected/event/cancelEvent',$scope.requestObject).success(function(response) {
	 		$http.get('rest/protected/event/getAllEventByUser/'+$scope.loggedUser.userId).success(function(response) {
				$scope.events = response.eventList;
			});
	 	})
	 }
	
	$scope.onFileSelect = function($files) {
		$scope.file = $files[0];
	};
	
	$scope.createEvent = function() {
		$scope.upload = $upload
				.upload(
						{
							url : 'rest/protected/event/createEvent',
							data : {
								'name':$scope.eventName,
								'description':$scope.eventDescription,
								'largeDescription':$scope.eventLargeDescription,
								'eventType':$scope.eventType,
								'eventPlaceName':$scope.eventPlaceName,
								'placeLatitude':$scope.map.center.latitude,
								'placeLongitude':$scope.map.center.longitude, 
								'loggedUser':$scope.loggedUser.userId,
							},
							file : $scope.file,
						})
				.progress(
						function(evt) {

						})
				.success(
						function(data, status, headers, config) {
							$http.get('rest/protected/event/getAllEventByUser/'+$scope.loggedUser.userId).success(function(response) {
								$scope.events = response.eventList;
							});
							$('#modalCreateEvent').modal('toggle');
						}); 
		console.log($scope.eventType);
	};
	
    MarkerCreatorService.createByCoords(9.6283789, -85.3756947, function (marker) {
        $scope.autentiaMarker = marker;
    });
    
    $scope.address = '';

    $scope.map = {
        center: {
            latitude: $scope.autentiaMarker.latitude,
            longitude: $scope.autentiaMarker.longitude
        },
        zoom: 14,
        markers: [],
        control: {},
        options: {
            scrollwheel: false
        }
    };

    $scope.map.markers.push($scope.autentiaMarker);

    $scope.addCurrentLocation = function () {
        MarkerCreatorService.createByCurrentLocation(function (marker) {
            marker.options.labelContent = 'Usted está aquí.';
            $scope.map.markers.push(marker);
            refresh(marker);
        });
    };
    
    $scope.addAddress = function() {
        var address = $scope.address;
        if (address !== '') {
            MarkerCreatorService.createByAddress(address, function(marker) {
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        }
    };

    function refresh(marker) {
        $scope.map.control.refresh({latitude: marker.latitude,
            longitude: marker.longitude});
    }
    
	$http.get('rest/protected/service/getServiceByProvider/'+$scope.loggedUser.userId ).success(function(response) {
		$scope.services = response.serviceLists;
	});
}]);