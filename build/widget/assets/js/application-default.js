
        //---------------------------------------------------------------------
        // Cordova event listeners
        //---------------------------------------------------------------------

        // invoked when device is ready 
        function deviceInfo() {
            document.getElementById('window.device.platform').innerHTML = 'window.device.platform = ' + window.device.platform;
            document.getElementById('window.device.version').innerHTML  = 'window.device.version  = ' + window.device.version;
            document.getElementById('window.device.uuid').innerHTML     = 'window.device.uuid     = ' + window.device.uuid;
            document.getElementById('window.device.cordova').innerHTML = 'window.device.cordova = ' + window.device.cordova;

            setNetworkType();
        }
        
        // invoked when application is resumed (brought to foregroud)
        function doResume() {
            console.log('doResume()');
        }
      
        // invoked when application is paused (sent to background)
        function doPause() {
            console.log('doPause()');
        }

        // invoked when application is online
        function doOnline() {
            console.log('Event: online\n' + 'Network Type: ' + navigator.network.connection.type + '\n');
            setNetworkType();
        }

        // invoked when application is offline
        function doOffline() {
            console.log('Event: offline\n' + 'Network Type: ' + navigator.network.connection.type + '\n');
            setNetworkType();
        }

        // register Cordova event listeners when DOM content loaded
        function init() {
            console.log('init()');
            document.addEventListener("deviceready", deviceInfo, true); 
            document.addEventListener("resume", doResume, false);
            document.addEventListener("pause", doPause, false);
            document.addEventListener("online", doOnline, false);
            document.addEventListener("offline", doOffline, false);
        }

        function unload() {
            console.log('unload()'); 
        }
      
        function fail(error) {
            navigator.notification.alert(error, null, "Error");
        }
        
        //---------------------------------------------------------------------
        // Notification
        //---------------------------------------------------------------------

        function callBeep() {
            navigator.notification.beep(2);
        }

        function callVibrate() {
            navigator.notification.vibrate(1000);
        }
      
        function alertDismissed() {
            alert('Alert dialog dismissed.');
        }
      
        function callAlert() {
            navigator.notification.alert(
            "You rock!", 
            alertDismissed,
            "Woohoo!", 
            "Thanks");
        }

        function confirmResult(button) {
            console.log('Confirm: you pressed button ' + button);
        }

        function callConfirm() {
            navigator.notification.confirm(
            "Please confirm", 
            confirmResult,
            "Are you sure?", 
            "Yes,No,Maybe");
        }

        //---------------------------------------------------------------------
        // Network
        //---------------------------------------------------------------------
        function setNetworkType() {
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';
            document.getElementById('networkStatus').innerHTML = 'Connection type = ' + states[navigator.network.connection.type];
        }

        //---------------------------------------------------------------------
        // Accelerometer
        //---------------------------------------------------------------------
        function showAcceleration(acceleration) {
            alert('Acceleration X: ' + acceleration.x + '\n' +
                  'Acceleration Y: ' + acceleration.y + '\n' +
                  'Acceleration Z: ' + acceleration.z + '\n');
        }

        var accelWatchId = null;
        var watchAcceleration = function() {
            var success = function(a) {
                document.getElementById('x').innerHTML = a.x;
                document.getElementById('y').innerHTML = a.y;
                document.getElementById('z').innerHTML = a.z;
            };
            var options = {};
            options.frequency = 200;
            accelWatchId = navigator.accelerometer.watchAcceleration(success, fail, options);
        }
      
        function clearAccelWatch() {
            if (accelWatchId != null) {
                navigator.accelerometer.clearWatch(accelWatchId);
                accelWatchId = null;
            }
        }

        function getAcceleration() {
            navigator.accelerometer.getCurrentAcceleration(showAcceleration, fail);
        }

        //---------------------------------------------------------------------
        // Geolocation
        //---------------------------------------------------------------------
        function getLocation() {
            var success = function(p) {
                alert('Latitude: '  + p.coords.latitude + '\n' + 
                      'Longitude: ' + p.coords.longitude);
            };
            var options = {};
            options.enableHighAccuracy = true;
            var timeout = new Number(document.getElementById('geo_timeout').value);
            if (isNaN(timeout) === false) {
                options.timeout = timeout*1000;
            }
            var maxage = new Number(document.getElementById('geo_maxage').value);
            if (isNaN(maxage) === false) {
                options.maximumAge = maxage*1000;
            }
            navigator.geolocation.getCurrentPosition(success, onLocationFail, options);
        }

        var locationWatchId = null;
        var watchLocation = function() {
            var success = function(p) {
                document.getElementById('lat').innerHTML = p.coords.latitude;
                document.getElementById('long').innerHTML = p.coords.longitude;
            };
            var options = {};
            options.enableHighAccuracy = true;
            var timeout = new Number(document.getElementById('geo_timeout').value);
            if (isNaN(timeout) === false) {
                options.timeout = timeout*1000;
            }
            var maxage = new Number(document.getElementById('geo_maxage').value);
            if (isNaN(maxage) === false) {
                options.maximumAge = maxage*1000;
            }
            locationWatchId = navigator.geolocation.watchPosition(success, onLocationFail, options);
        }

        function clearLocationWatch() {
            if (locationWatchId != null) {
                navigator.geolocation.clearWatch(locationWatchId);
                locationWatchId = null;
            }
            document.getElementById('lat').innerHTML = "";
            document.getElementById('long').innerHTML = "";
        }
      
        function onLocationFail(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }
      
        //---------------------------------------------------------------------
        // Camera
        //---------------------------------------------------------------------
        function onCapturePhotoSuccess(imageData) {
            if (imageData != null) {
                var smallImage = document.getElementById('cameraImage');

                // hide upload button
                var uploadButton = document.getElementById('uploadButton');
                uploadButton.style.display = 'none';

                // Unhide image element
                smallImage.style.display = 'block';

                // Show the captured photo
                // The inline CSS rules are used to resize the image
                smallImage.src = "data:image/jpeg;base64," + imageData;
            }
        }

        function onCapturePhotoURISuccess(imageURI) {
            if (imageURI != null) {
                var smallImage = document.getElementById('cameraImage');
                var uploadButton = document.getElementById('uploadButton');

                // Unhide image elements
                smallImage.style.display = 'block';
                uploadButton.style.display = 'block';
          
                // Show the captured photo
                // The inline CSS rules are used to resize the image
                smallImage.src = imageURI;
            }
        }
      
        function capturePhoto() {
            navigator.camera.getPicture(onCapturePhotoSuccess, fail, 
                { destinationType: Camera.DestinationType.DATA_URL, quality: 50 });
        }

        function capturePhotoURI() {
            navigator.camera.getPicture(onCapturePhotoURISuccess, fail, 
                { destinationType: Camera.DestinationType.FILE_URI, quality: 50 });
        }

        function uploadImage() {
            var smallImage = document.getElementById('cameraImage');
            if (smallImage.src && smallImage.src !== "") {
                var f = new FileTransfer();
                f.upload(
                    // file path
                    smallImage.src,
                    // server URL - update to your own, and don't forget to 
                    // include your domain in an access element in config.xml      
                    "http://192.168.1.1/upload.php",
                    // success callback
                    function(result) {
                        document.getElementById('uploadProgress').innerHTML =
                            result.bytesSent + ' bytes sent';
                        alert(result.responseCode + ": " + result.response);
                    },
                    // error callback
                    function(error) {
                        alert('error uploading file: ' + error.code);
                    },
                    // options
                    { fileName: 'myImage.jpg', 
                      params: { 'username':'jtyberg' } 
                    });
            }
        }

        //---------------------------------------------------------------------
        // Contacts
        //---------------------------------------------------------------------
        function onContactSaved(contact) {
            var msg = "Contact " + contact.id + " saved.";
            navigator.notification.alert(msg, null, "Success");      
        }

        function onContactUpdated(contact) {
            var msg = 'Contact ' + contact.id + ' updated.';
            navigator.notification.alert(msg, null, "Success");      
        }

        function onContactRemoved(contact) {
            var msg = "Contact " + contact.id + " removed.";      
            navigator.notification.alert(msg, null, "Success");      
        }

        function createContact() {
            var myContact = navigator.contacts.create({"displayName": "fitness instructor"});
            myContact.note = "Workout queen.";
            myContact.birthday = new Date("May 11, 1979 05:32:00");
        
            // add name
            var myName = new ContactName();
            myName.givenName = "Shoshana";
            myName.familyName = "Lowenstein";
            myName.honorificPrefix = "Miss";
            myContact.name = myName;

            // add email
            var emails = [];
            emails[0] = new ContactField("work","im@work.com");
            emails[1] = new ContactField("home","im@home.com",true);
            emails[2] = new ContactField(null,"im@other.com");
            emails[3] = new ContactField(null,"im@aloss.com"); // 4th will be ignored
            myContact.emails = emails;

            // add phone numbers
            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField("work","555-111-1111");
            phoneNumbers[1] = new ContactField("home","555-222-1111");
            phoneNumbers[2] = new ContactField("home","555-222-2222");
            phoneNumbers[3] = new ContactField(null,"555-333-1234");
            phoneNumbers[4] = new ContactField("fax","555-444-1234");
            phoneNumbers[5] = new ContactField("work","555-111-2222");
            phoneNumbers[6] = new ContactField("mobile","555-555-5555",true);
            phoneNumbers[7] = new ContactField("work","555-111-3333"); // 3rd 'work' phone will be ignored
            phoneNumbers[8] = new ContactField("pager","555-666-1111");
            myContact.phoneNumbers = phoneNumbers;
        
            // add address
            var addresses = [];
            addresses[0] = new ContactAddress(null, "home", null, "123 Astor Place", "Phoenix", "AZ", "58392", "United States");
            addresses[1] = new ContactAddress(null, "work", null, "290 Farmers Mills Rd", "Riverdale", "AZ", "58399", "United States");
            myContact.addresses = addresses;

            // add urls
            var urls = [];
            urls[0] = new ContactField(null,"http://my.domain.com");
            myContact.urls = urls;
                
            // add company info
            var orgs = [];
            orgs[0] = new ContactOrganization(null, null, "Beach Fitness", null, "Instructor", null);
            myContact.organizations = orgs;
        
            // add categories
            var categories = [];
            categories[0] = "Business";
            categories[1] = "Family"; // DOH! BlackBerry only supports 'Personal' and 'Business'
            myContact.categories = categories;
            
            // add photo
            var smallImage = document.getElementById('cameraImage');
            if (smallImage.src && smallImage.src !== "") {
                var photos = [];
                photos[0] = new ContactField(null, smallImage.src);
                myContact.photos = photos;
            }
            
            // saves the contact to device
            myContact.save(onContactSaved);
        } 

        function updateContact() {
            // find a contact to update
            navigator.contacts.find(
                ['name','emails'],
                function(contacts) {
                    var now = new Date();         
                    
                    // we did not specify any filter, so all contacts will be returned
                    // update first contact and save
                    if (contacts[0]) {
                        var c = contacts[0];

                        // update attributes
                        c.categories = [ 'Personal' ];
                        c.emails[0].value = "sl@bf.com";
                        c.note = 'updated: ' + now;
                        console.log('contact: ' + c.id + ' ' + c.note);
                    
                        // remove phone numbers
                        c.phoneNumbers = [];
                    
                        // set field to non-null value to remove from database
                        c.birthday = "";
                    
                        // save changes
                        c.save(onContactUpdated);
                    }
                },
                fail
            );
        }
      
        function findContacts() {
            var filterText = document.getElementById('filterText').value;
            navigator.contacts.find(
                ['name', 'emails', 'addresses', 'organizations'], 
                function(contacts) {
                    var msg = 'Found ' + contacts.length + ' contacts.';
                    navigator.notification.alert(msg, null, 'Success');
                }, 
                fail,
                { 
                    multiple: true, filter: filterText
                }
            );
        }

        function removeContact() {
            // find a contact to remove
            navigator.contacts.find(
                ["*"],
                // remove first contact
                function(contacts) {
                    if (contacts[0]) {
                        contacts[0].remove(onContactRemoved);
                    }
                },
                fail);
        }

        //---------------------------------------------------------------------
        // File
        //---------------------------------------------------------------------
        
        // retrieves root file system entry
        var getFileSystemRoot = (function() {

            // private
            var root;
            
            // one-time retrieval of the root file system entry
            var init = function() {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                    function(fileSystem) {
                        root = fileSystem.root;
                    }, 
                    onFileSystemError);
            };
            document.addEventListener("deviceready", init, true); 

            // public function returns private root entry
            return function() {
                return root;
            };
        }()); // execute immediately

        // file system error handler
        function onFileSystemError(error) {
            var msg = 'file system error: ' + error.code;
            navigator.notification.alert(msg, null, 'File System Error');
        }

        // logs file events
        function onFileEvent(event) {
            console.log('file event: ' + event.target.fileName + ' ' + event.type);
        }
      
        // called when error reading file
        function onFileError(event) {
            console.log('file error: ' + event.target.error.code);
        }
      
        // called when file is loaded
        function onFileLoaded(event) {
            onFileEvent(event);
            console.log(event.target.result);
            alert('FileReader.result: ' + event.target.fileName + ': ' + event.target.result);  
        }
      
        // reads a text file
        function readFileAsText()
        {   
            var fileReader = new FileReader(),
                root = getFileSystemRoot(),
                file;
          
            // set the callbacks
            fileReader.onloadstart = onFileEvent;
            fileReader.onprogress = onFileEvent;
            fileReader.onload = onFileLoaded;
            fileReader.onloadend = onFileEvent;
            fileReader.onabort = onFileEvent;
            fileReader.onerror = onFileError;
          
            // read the file
            file = new File();
            file.fullPath = root.toURI() + '/cordova.txt';
            fileReader.readAsText(file);
        }

        // reads a text file and encodes to Base64
        function readFileAsDataURL()
        {   
            var fileReader = new FileReader(),
                root = getFileSystemRoot(),
                file;
            // set the callbacks
            fileReader.onloadstart = onFileEvent;
            fileReader.onload = onFileLoaded;
            fileReader.onprogress = onFileEvent;
            fileReader.onloadend = onFileEvent;
            fileReader.onabort = onFileEvent;
            fileReader.onerror = onFileError;
          
            // read the file
            file = new File();  
            file.fullPath = root.toURI() + '/cordova.txt';
            fileReader.readAsDataURL(file);
        }

        // called when file is written
        function onFileWrite(event) {
            onFileEvent(event);
            console.log('FileWriter position=' + 
                event.target.position + ", length=" + event.target.length);
        }

        // writes a text file to the device
        function writeFile() 
        {
                // root file system entry
            var root = getFileSystemRoot(),
            
                // writes a file
                write_file = function(writer) {
                    var lineCount = 1;
                              
                    // set the callbacks
                    writer.onwritestart = onFileEvent;
                    writer.onprogress = onFileEvent;
                    writer.onwrite = onFileWrite;
                    writer.onabort = onFileEvent;
                    writer.onerror = onFileError;
                    writer.onwriteend = function(event) {
                        onFileEvent(event);
                        lineCount += 1;
                        if (lineCount <= 3) {
                            // append a new line   
                            writer.write('Line ' + lineCount + '.\r\n');  
                        } 
                        else {
                            alert(writer.fileName + 
                                ' length=' + writer.length + 
                                ', position=' + writer.position);
                        }
                    }
                    
                    // append
                    writer.seek(writer.length);
          
                    // write to file
                    writer.write('Line ' + lineCount + '.\r\n');   
                },
                
                // creates a FileWriter object
                create_writer = function(fileEntry) {
                    fileEntry.createWriter(write_file, onFileSystemError);
                };
            
            // create a file and write to it
            root.getFile('cordova.txt', {create: true}, create_writer, onFileSystemError);
        }
      
        // truncates a file
        function truncateFile() {
                // root file system entry
            var root = getFileSystemRoot(),

                // truncates a file
                truncate_file = function(writer) {
                    // set the callbacks
                    writer.onwritestart = onFileEvent;
                    writer.onprogress = onFileEvent;
                    writer.onwrite = onFileWrite;
                    writer.onabort = onFileEvent;
                    writer.onerror = onFileError;
                    writer.onwriteend = function(event) {
                        onFileEvent(event);
                        alert(writer.fileName + 
                            ' length=' + writer.length + 
                            ', position=' + writer.position);
                    }

                    // strip off the last 3 bytes of the file
                    writer.truncate(writer.length-3);
                },
                
                // creates a FileWriter object
                create_writer = function(fileEntry) {
                    fileEntry.createWriter(truncate_file, onFileSystemError);
                };
                
            // retrieve a file and truncate it
            root.getFile('cordova.txt', {create: false}, create_writer, onFileSystemError);
        }
        
        // retrieve root file system
        function getFileSystem(type, success, error)
        {
            var type = type || parseInt(document.getElementById('fsType').value),
                success = success || function(fileSystem) {
                    // get the root file system entry
                    var root = fileSystem.root;
                    
                    // display file system path
                    document.getElementById('fsURI').value = root.toURI();    
                    
                    // display root file system entry
                    displayEntry(root);
                },
                fail = error || onFileSystemError;
            
            // get file system    
            window.requestFileSystem(type, 0, success, fail);
        }
        
        // get file system path from input
        function getFileSystemURI() 
        {
            return document.getElementById('fsURI').value;        
        }
        
        // retrieve file system entry from URI
        function resolveFileSystemURI() 
        {
            window.resolveLocalFileSystemURI(getFileSystemURI(), displayEntry, onFileSystemError);
        }
        
        // display file system entry
        function displayEntry(entry) {
            navigator.notification.alert(entry, null, 'File System Entry');                    
        }       

        // retrieve file system entry metadata        
        function getMetadata()
        {
            var displayMetadata = function(metadata) {
                    navigator.notification.alert(metadata, null, 'Metadata');
                },
                callback = function(entry) {
                    entry.getMetadata(displayMetadata, onFileSystemError);
                };
            
            // look up file system entry and display its metadata
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        } 
        
        // retrieve parent directory
        function getParent() 
        {
            var callback = function(entry) {
                    entry.getParent(displayEntry, onFileSystemError);
                };
            
            // look up file system entry and display its parent
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }
        
        // remove file system entry
        function removeFileEntry() 
        {
            var callback = function(entry) {
                    entry.remove(function() {
                        navigator.notification.alert(entry.toURI(), null, 'Entry deleted');                    
                    }, onFileSystemError);
                };

            // look up file system entry and attempt to delete it
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        } 
      
        // remove directory recursively
        function removeDirectory(entry) 
        {
            var callback = function(entry) {
                    if (entry.constructor === DirectoryEntry) {
                        entry.removeRecursively(function() {
                            navigator.notification.alert(entry.toURI(), null, 'Entry deleted');                    
                        }, onFileSystemError);
                    }
                    else {
                        navigator.notification.alert(entry.toURI(), null, 'Not a directory');                
                    }
                };

            // look up directory entry and recursively remove it
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }
        
        // retrieve or create a file on the file system
        function getFile() 
        {
                // file path to append to file system root
            var filePath = document.getElementById('filePath').value,
                // get file entry
                callback = function(entry) {
                    entry.getFile(
                        // file path
                        filePath,
                        // options
                        { create: true },
                        // success callback
                        displayEntry,
                        // error callback
                        onFileSystemError);
                };

            // look up file system entry 
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        } 
        
        // retrieve or create a directory on the file system
        function getDirectory() 
        {
                // file path
            var filePath = document.getElementById('filePath').value,
                // get directory entry
                callback = function(entry) {
                    entry.getDirectory(
                        // file path
                        filePath,
                        // options
                        { create: true },
                        // success callback
                        displayEntry,
                        // error callback
                        onFileSystemError);
                };

            // look up file system entry 
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }

        // list the contents of a directory        
        function readEntries() 
        {
                // file path
            var filePath = document.getElementById('filePath').value,
                // list directory entries
                callback = function(entry) {
                    var reader = entry.createReader();
                    reader.readEntries(
                        function(entries) {
                            entries[0].getParent(displayEntry, onFileSystemError);
                        },
                        onFileSystemError);
                };

            // look up file system entry 
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }

        // copy file system entry
        function copyTo() 
        {
                // copy file system entry
            var callback = function(srcEntry) {
                    var parent = document.getElementById('parent').value,
                        newName = document.getElementById('newName').value,
                        parentEntry = new Entry({fullPath: parent});
                        srcEntry.copyTo(parentEntry, newName, displayEntry, onFileSystemError);
                };
                
            // look up file system entry and copy it to destination path
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }

        // move file system entry
        function moveTo() 
        {
                // move file system entry
            var callback = function(srcEntry) {
                    var parent = document.getElementById('parent').value,
                        newName = document.getElementById('newName').value,
                        parentEntry = new Entry({fullPath: parent});
                        srcEntry.moveTo(parentEntry, newName, displayEntry, onFileSystemError);
                };

            // look up file system entry and move it to destination path
            window.resolveLocalFileSystemURI(getFileSystemURI(), callback, onFileSystemError);
        }

        //---------------------------------------------------------------------
        // Media Capture
        //---------------------------------------------------------------------
        
        (function() {
            // display capture modes
            var displayCaptureModes = function() {
                var i, len, mode, modes = "Audio:\n";
                for (i = 0; len = navigator.device.capture.supportedAudioModes.length, i < len; i += 1) {
                    mode = navigator.device.capture.supportedAudioModes[i];
                    modes += mode.type + ';\n';
                }
                document.getElementById('supportedAudioModes').innerHTML = modes;
                modes = "Image:\n";
                for (i = 0; len = navigator.device.capture.supportedImageModes.length, i < len; i += 1) {
                    mode = navigator.device.capture.supportedImageModes[i];
                    modes += mode.type + ',' + mode.width + 'x' + mode.height + ';\n';
                }
                document.getElementById('supportedImageModes').innerHTML = modes;
                modes = "Video:\n";
                for (i = 0; len = navigator.device.capture.supportedVideoModes.length, i < len; i += 1) {
                    mode = navigator.device.capture.supportedVideoModes[i];
                    modes += mode.type + ',' + mode.width + 'x' + mode.height + ';\n';
                }
                document.getElementById('supportedVideoModes').innerHTML = modes;
            };
            document.addEventListener("deviceready", displayCaptureModes, true); 
        }());
        
        function startAudioCapture() 
        {
            navigator.device.capture.captureAudio(function(mediaFiles) {
                var i, file, len, msg = '';
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    msg += mediaFiles[i].fullPath + '\n';
                }
                navigator.notification.alert(msg, null, 'Captured audio clips');
            }, function(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }, {limit:2});
        }
        
        function stopCaptures() 
        {
            navigator.device.capture.stopCaptures();
        }
        
        function startImageCapture() 
        {
            navigator.device.capture.captureImage(function(mediaFiles) {
                var i, file, len, msg = '';
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    msg += mediaFiles[i].fullPath + '\n';
                }
                navigator.notification.alert(msg, null, 'Captured images');
            }, function(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }, {limit:2});
        }
                
        function startVideoCapture() 
        {
            navigator.device.capture.captureVideo(function(mediaFiles) {
                var i, file, len, msg = '';
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    msg += mediaFiles[i].fullPath + '\n';
                }
                navigator.notification.alert(msg, null, 'Captured video clips');
            }, function(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }, {limit:2});
        }
