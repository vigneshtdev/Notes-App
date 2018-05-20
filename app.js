console.log('Starting App.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs
            .command('add','Add new String',{
                title: {
                    describe: 'Title of note',
                    demand: true,
                    alias:'t'
                },
                body: {
                    describe: 'Message to be included in the note',
                    demand:true,
                    alias:'t'
                },
            })
            .command('list','Enlists existing Notes')
            
            .help()
            .argv;
let command = argv._[0];

console.log('yargs.argv',argv);

if(command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if(note === undefined)
        console.log('Error. Note with the same title already exists');
    else {
        console.log('Note added');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
} else if(command === 'list') {
    notes.getAll();
} else if(command === 'read'){
    notes.read(argv.title); 
} else if(command === 'remove') {
    let removed = notes.removeNote(argv.title);
    removed ? console.log("Note Removed"):console.log("Note not removed");
} else {
    console.log('Command not recognised');
}

