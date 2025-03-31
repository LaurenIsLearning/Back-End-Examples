// refer to https://www.edx.org/course/introduction-node-js-microsoft-dev283x by Azat Mardan

import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({name: String})

const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs';
mongoose.connect(remoteurl, { useNewUrlParser: true, useUnifiedTopology: true })

let Course = mongoose.model('Course', courseSchema)
Course.deleteMany({}, function(err) { 
   console.log('collection removed') 
});
let devCourse = new Course({    name: 'Dev Ops',
                                startDate: new Date(),    
                            })
let realityCourse = new Course({ name: 'Augmented Reality/Virtual Reality'})
let webDevCourse = new Course({ name: 'Full-Stack Web Development'})
let result = await devCourse.save();
await realityCourse.save();
await webDevCourse.save();
console.log('Saved: ', result);