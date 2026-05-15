require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('../models/JobRequest');

const sampleJobs = [
  {
    title: 'Need a plumber for a leaking kitchen tap',
    description: 'Kitchen tap is leaking and dripping water. Need someone to fix it ASAP. The tap is located under the sink and the leak seems to be coming from the base of the tap.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'John Smith',
    contactEmail: 'john.smith@email.com'
  },
  // {
  //   title: 'Electrical work - install new light switch',
  //   description: 'Need to install a new light switch in the hallway. The wiring should already be in place. Looking for someone experienced and certified.',
  //   category: 'Electrical',
  //   location: 'Edinburgh',
  //   contactName: 'Sarah Johnson',
  //   contactEmail: 'sarah.j@email.com'
  // },
  // {
  //   title: 'Interior painting - bedroom walls',
  //   description: 'Need to repaint the master bedroom. Walls are currently cream colored. Looking to change to a light grey. Approximately 200 sqft of wall space.',
  //   category: 'Painting',
  //   location: 'Manchester',
  //   contactName: 'Michael Brown',
  //   contactEmail: 'michael.brown@email.com'
  // },
  // {
  //   title: 'Joinery work - custom bookshelf installation',
  //   description: 'Need someone to build and install a custom bookshelf in the living room. We have the design and materials. Professional finish required.',
  //   category: 'Joinery',
  //   location: 'Bristol',
  //   contactName: 'Emma Wilson',
  //   contactEmail: 'emma.wilson@email.com'
  // },
  // {
  //   title: 'Fix broken bathroom tiles',
  //   description: 'Several tiles in the bathroom have cracked and need to be replaced. Bathroom is 5x7 feet. Looking for quick turnaround.',
  //   category: 'Other',
  //   location: 'Leeds',
  //   contactName: 'Robert Davis',
  //   contactEmail: 'robert.davis@email.com'
  // },
  // {
  //   title: 'HVAC system maintenance and cleaning',
  //   description: 'Annual maintenance for home HVAC system. Filters need replacement and general cleaning required.',
  //   category: 'HVAC',
  //   location: 'Liverpool',
  //   contactName: 'Patricia Miller',
  //   contactEmail: 'patricia.miller@email.com'
  // },
  // {
  //   title: 'Carpentry work - deck repair',
  //   description: 'Back deck needs repair. Several boards are rotting and need replacement. Looking for quality work that will last.',
  //   category: 'Carpentry',
  //   location: 'Glasgow',
  //   contactName: 'Thomas Anderson',
  //   contactEmail: 'thomas.anderson@email.com'
  // },
  // {
  //   title: 'Plumbing - new shower installation',
  //   description: 'Looking to upgrade bathroom with new modern shower enclosure. Need experienced plumber for installation.',
  //   category: 'Plumbing',
  //   location: 'Birmingham',
  //   contactName: 'Linda Taylor',
  //   contactEmail: 'linda.taylor@email.com'
  // },
  // {
  //   title: 'Electrical - rewire home office',
  //   description: 'Home office needs additional outlets and wiring for tech equipment. Need to ensure proper grounding and safety standards.',
  //   category: 'Electrical',
  //   location: 'London',
  //   contactName: 'James White',
  //   contactEmail: 'james.white@email.com'
  // },
  // {
  //   title: 'Exterior painting - house refresh',
  //   description: 'Looking to refresh the exterior paint of a 3-story Victorian house. Currently grey, looking for a classic white finish.',
  //   category: 'Painting',
  //   location: 'Oxford',
  //   contactName: 'Catherine Lee',
  //   contactEmail: 'catherine.lee@email.com'
  // }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/globaltna';
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await JobRequest.deleteMany({});
    console.log('✓ Cleared existing job requests');

    // Insert sample data
    const inserted = await JobRequest.insertMany(sampleJobs);
    console.log(`✓ Seeded ${inserted.length} sample job requests`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
