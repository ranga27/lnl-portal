/* eslint-disable import/prefer-default-export */
// TODO: move this to DB config
const getOptions = (message) => {
  switch (true) {
    case /Consulting/i.test(message):
      return [
        { label: 'Advertising Consultant', value: 'Advertising Consultant' },
        { label: 'Business Consultant', value: 'Business Consultant' },
        { label: 'Compensation Consultant', value: 'Compensation Consultant' },
        { label: 'Economic Consultant', value: 'Economic Consultant' },
        {
          label: 'Environmental Consultant',
          value: 'Environmental Consultant',
        },
        { label: 'Financial Consultant', value: 'Financial Consultant' },
        { label: 'HR Consultant', value: 'HR Consultant' },
        { label: 'Junior Consultant', value: 'Junior Consultant' },
        { label: 'Legal Consultant', value: 'Legal Consultant' },
        { label: 'Marketing Consultant', value: 'Marketing Consultant' },
        {
          label: 'Marketing Data Consultant',
          value: 'Marketing Data Consultant',
        },
        { label: 'Principal Consultant', value: 'Principal Consultant' },
        { label: 'Recruitment Consultant', value: 'Recruitment Consultant' },
        { label: 'Safety Consultant', value: 'Safety Consultant' },
        { label: 'Sales Consultant', value: 'Sales Consultant' },
        { label: 'Senior Consultant', value: 'Senior Consultant' },
        { label: 'Staffing Consultant', value: 'Staffing Consultant' },
        { label: 'Technology Consultant', value: 'Technology Consultant' },
      ];
    case /Marketing/i.test(message):
      return [
        { label: 'Account Coordinator', value: 'Account Coordinator' },
        {
          label: 'Communications Specialist',
          value: 'Communications Specialist',
        },
        { label: 'Development Associate', value: 'Development Associate' },
        {
          label: 'Inside-sales Representatives',
          value: 'Inside-sales Representatives',
        },
        { label: 'Junior Business Analyst', value: 'Junior Business Analyst' },
        { label: 'Marketing Coordinator', value: 'Marketing Coordinator' },
        {
          label: 'Outside Sales Representatives',
          value: 'Outside Sales Representatives',
        },
        {
          label: 'Public Relations Coordinator',
          value: 'Public Relations Coordinator',
        },
        { label: 'Recruiter', value: 'Recruiter' },
        { label: 'Social Media Specialist', value: 'Social Media Specialist' },
      ];
    case /Engineering/i.test(message):
      return [
        { label: 'Automation Engineer', value: 'Automation Engineer' },
        { label: 'Civil Engineer', value: 'Civil Engineer' },
        { label: 'Data Analyst', value: 'Data Analyst' },
        { label: 'Data Scientist', value: 'Data Scientist' },
        { label: 'Engineering Assistant', value: 'Engineering Assistant' },
        { label: 'Field Engineer', value: 'Field Engineer' },
        { label: 'Mechanical Engineer', value: 'Mechanical Engineer' },
        { label: 'Procurement', value: 'Procurement' },
        { label: 'Project Analyst', value: 'Project Analyst' },
        { label: 'Project Planner', value: 'Project Planner' },
        { label: 'Quality Engineer', value: 'Quality Engineer' },
        { label: 'Quality Analyst', value: 'Quality Analyst' },
        { label: 'Risk Analyst', value: 'Risk Analyst' },
        { label: 'Sales Engineer', value: 'Sales Engineer' },
        { label: 'Software Engineer', value: 'Software Engineer' },
        {
          label: 'Telecommunications Engineer',
          value: 'Telecommunications Engineer',
        },
      ];
    case /Project and Programme Management/i.test(message):
      return [
        { label: 'Event Organiser', value: 'Event Organiser' },
        { label: 'Junior Business Analyst', value: 'Junior Business Analyst' },
        { label: 'Junior Project Manager', value: 'Junior Project Manager' },
        { label: 'Product Designer', value: 'Product Designer' },
        { label: 'Project Assistant', value: 'Project Assistant' },
        { label: 'Project Coordinator', value: 'Project Coordinator' },
        { label: 'Researcher', value: 'Researcher' },
        { label: 'Technical Analyst', value: 'Technical Analyst' },
      ];

    case /Media, journalism, PR and publishing/i.test(message):
      return [
        {
          label: 'Communications Coordinator',
          value: 'Communications Coordinator',
        },
        { label: 'Copy Editor', value: 'Copy Editor' },
        { label: 'Copywriter', value: 'Copywriter' },
        { label: 'Editorial Assistant', value: 'Editorial Assistant' },
        { label: 'Fundraising Associate', value: 'Fundraising Associate' },
        { label: 'Journalist', value: 'Journalist' },
        { label: 'PR Assistant', value: 'PR Assistant' },
        { label: 'PR Associate	', value: 'PR Associate	' },
        { label: 'PR Officer', value: 'PR Officer' },
        { label: 'Social Media Specialist', value: 'Social Media Specialist' },
        { label: 'Content Writer', value: 'Content Writer' },
        { label: 'Account Executive', value: 'Account Executive' },
        { label: 'Assistant Media Planner', value: 'Assistant Media Planner' },
        { label: 'Associate Producer', value: 'Associate Producer' },
        { label: 'Canvasser', value: 'Canvasser' },
        { label: 'Content Marketer', value: 'Content Marketer' },
        { label: 'Junior Digital Reporter', value: 'Junior Digital Reporter' },
        { label: 'Literary Agent', value: 'Literary Agent' },
        {
          label: 'Live Show Production Assistant',
          value: 'Live Show Production Assistant',
        },
        {
          label: 'Media Campaign Specialist',
          value: 'Media Campaign Specialist',
        },
        { label: 'Publicist', value: 'Publicist' },
        { label: 'Technical Writer', value: 'Technical Writer' },
        { label: 'Video Associate', value: 'Video Associate' },
      ];

    case /Financial Services/i.test(message):
      return [
        { label: 'Accountant', value: 'Accountant' },
        { label: 'Actuary', value: 'Actuary' },
        { label: 'Benefits Specialist', value: 'Benefits Specialist' },
        { label: 'Budget Analyst', value: 'Budget Analyst' },
        { label: 'Credit Analyst', value: 'Credit Analyst' },
        { label: 'Financial Advisor', value: 'Financial Advisor' },
        { label: 'Financial Analyst', value: 'Financial Analyst' },
        { label: 'Financial Auditor', value: 'Financial Auditor' },
        {
          label: 'Insurance Claim Adjuster',
          value: 'Insurance Claim Adjuster',
        },
        { label: 'Insurance Underwriter', value: 'Insurance Underwriter' },
        {
          label: 'Investment Banking Analyst',
          value: 'Investment Banking Analyst',
        },
        { label: 'Tax Accountant', value: 'Tax Accountant' },
      ];

    case /Travel/i.test(message):
      return [
        {
          label: 'Customer Training Specialist ',
          value: 'Customer Training Specialist ',
        },
        { label: 'Travel Consultant', value: 'Travel Consultant' },
        { label: 'Travel Field Technician', value: 'Travel Field Technician' },
        { label: 'Travelling Receptionist', value: 'Travelling Receptionist' },
        {
          label: 'Travel Reservation Agent',
          value: 'Travel Reservation Agent',
        },
      ];

    case /Beauty, Cosmetics, Fashion/i.test(message):
      return [
        { label: 'Aesthetician', value: 'Aesthetician' },
        { label: 'Beauty Consultant', value: 'Beauty Consultant' },
        {
          label: 'Buying and Merchandising ',
          value: 'Buying and Merchandising ',
        },
        { label: 'Eyelash specialist', value: 'Eyelash specialist' },
        { label: 'Fashion designer', value: 'Fashion designer' },
        { label: 'Hair Stylist', value: 'Hair Stylist' },
        { label: 'Image Consultant', value: 'Image Consultant' },
        { label: 'Makeup Artist', value: 'Makeup Artist' },
        { label: 'Nail technician', value: 'Nail technician' },
        { label: 'Salon manager', value: 'Salon manager' },
        { label: 'Tattoo Artist', value: 'Tattoo Artist' },
        { label: 'Training Consultant', value: 'Training Consultant' },
      ];

    case /Education/i.test(message):
      return [
        { label: 'Counsellor', value: 'Counsellor' },
        {
          label: 'Elementary School Teacher',
          value: 'Elementary School Teacher',
        },
        { label: 'Health Educator ', value: 'Health Educator ' },
        { label: 'High School Teacher', value: 'High School Teacher' },
        { label: 'Primary School Teacher', value: 'Primary School Teacher' },
        { label: 'Preschool Teacher', value: 'Preschool Teacher' },
        { label: 'Nonprofit Coordinator', value: 'Nonprofit Coordinator' },
        { label: 'Professor ', value: 'Professor ' },
        { label: 'Researcher', value: 'Researcher' },
        { label: 'School secretary', value: 'School secretary' },
        { label: 'Sports Coach ', value: 'Sports Coach ' },
        { label: 'Teaching Assistant', value: 'Teaching Assistant' },
      ];

    case /Technology/i.test(message):
      return [
        { label: 'Back End Developer', value: 'Back End Developer' },
        { label: 'Cloud Engineer', value: 'Cloud Engineer' },
        { label: 'Computer System Analyst', value: 'Computer System Analyst' },
        {
          label: 'Customer Service Support',
          value: 'Customer Service Support',
        },
        { label: 'Data Scientist', value: 'Data Scientist' },
        { label: 'DevOps Engineer', value: 'DevOps Engineer' },
        { label: 'Front End Developer', value: 'Front End Developer' },
        { label: 'Full Stack Developer', value: 'Full Stack Developer' },
        {
          label: 'Help Desk Support Technician',
          value: 'Help Desk Support Technician',
        },
        {
          label: 'Information Security Analyst',
          value: 'Information Security Analyst',
        },
        { label: 'Software Engineer', value: 'Software Engineer' },
        {
          label: 'User Experience Designer',
          value: 'User Experience Designer',
        },
        { label: 'Web Developer', value: 'Web Developer' },
      ];

    case /Law/i.test(message):
      return [
        { label: 'Accountant', value: 'Accountant' },
        {
          label: 'Administrative Assistant',
          value: 'Administrative Assistant',
        },
        { label: 'Bailiff', value: 'Bailiff' },
        { label: 'Barrister', value: 'Barrister' },
        { label: 'Conveyancer', value: 'Conveyancer' },
        { label: 'Coroner', value: 'Coroner' },
        { label: 'Document Coder', value: 'Document Coder' },
        { label: 'Forensic Psychologist', value: 'Forensic Psychologist' },
        { label: 'Forensic Scientist ', value: 'Forensic Scientist ' },
        { label: 'Interpreter', value: 'Interpreter' },
        { label: 'Junior Legal Counsel', value: 'Junior Legal Counsel' },
        { label: 'Legal Adviser', value: 'Legal Adviser' },
        { label: 'Legal Associate', value: 'Legal Associate' },
        { label: 'Legal Executive', value: 'Legal Executive' },
        { label: 'Legal Receptionist', value: 'Legal Receptionist' },
        { label: 'Legal Secretary', value: 'Legal Secretary' },
        { label: 'Paralegal', value: 'Paralegal' },
        { label: 'Patent Attorney', value: 'Patent Attorney' },
        { label: 'Patent Agent', value: 'Patent Agent' },
        { label: 'Proofreader', value: 'Proofreader' },
        { label: 'Prosecutor', value: 'Prosecutor' },
        { label: 'Records Clerks', value: 'Records Clerks' },
        { label: 'Solicitor', value: 'Solicitor' },
        { label: 'Staff Attorney', value: 'Staff Attorney' },
      ];

    case /National and Local Government or Public Sector/i.test(message):
      return [
        { label: 'Arts administrator', value: 'Arts administrator' },
        {
          label: 'Chartered public finance accountant',
          value: 'Chartered public finance accountant',
        },
        {
          label: 'Civil Service administrator',
          value: 'Civil Service administrator',
        },
        {
          label: 'Civil Service Fast Streamer',
          value: 'Civil Service Fast Streamer',
        },
        { label: 'Clerk', value: 'Clerk' },
        { label: 'Company Secretary', value: 'Company Secretary' },
        { label: 'Corporate Treasurer', value: 'Corporate Treasurer' },
        {
          label: 'Diplomatic service officer',
          value: 'Diplomatic service officer',
        },
        { label: 'Education administrator', value: 'Education administrator' },
      ];

    case /Charity and Third Sector/i.test(message):
      return [
        {
          label: 'Administrator/Office Assistant',
          value: 'Administrator/Office Assistant',
        },
        { label: 'Campaigns Assistant', value: 'Campaigns Assistant' },
        { label: 'Development Assistant', value: 'Development Assistant' },
        { label: 'Fundraiser', value: 'Fundraiser' },
        { label: 'Policy Advisor', value: 'Policy Advisor' },
        {
          label: 'Policy and/or Research Assistant',
          value: 'Policy and/or Research Assistant',
        },
        { label: 'Volunteer Coordinator', value: 'Volunteer Coordinator' },
      ];

    case /Sustainability/i.test(message):
      return [
        {
          label: 'Animal Rehabilitation Technician',
          value: 'Animal Rehabilitation Technician',
        },
        { label: 'Ecologist', value: 'Ecologist' },
        {
          label: 'Environmental Consultant',
          value: 'Environmental Consultant',
        },
        { label: 'Environmental Scientist', value: 'Environmental Scientist' },
        { label: 'Research Scientist', value: 'Research Scientist' },
        {
          label: 'Sustainability Coordinator',
          value: 'Sustainability Coordinator',
        },
        {
          label: 'Sustainability Consultant',
          value: 'Sustainability Consultant',
        },
      ];

    case /Sales and Supply Chain/i.test(message):
      return [
        {
          label: 'Account Development Representative',
          value: 'Account Development Representative',
        },
        { label: 'Account Manager ', value: 'Account Manager ' },
        {
          label: 'Business Development Representative',
          value: 'Business Development Representative',
        },
        { label: 'Buyer', value: 'Buyer' },
        {
          label: 'Customer Development Representative',
          value: 'Customer Development Representative',
        },
        {
          label: 'Customer Success Manager',
          value: 'Customer Success Manager',
        },
        {
          label: 'Demand Generation Representative',
          value: 'Demand Generation Representative',
        },
        { label: 'Fulfillment Associate', value: 'Fulfillment Associate' },
        {
          label: 'Inside Sales Representative',
          value: 'Inside Sales Representative',
        },
        { label: 'Inventory Controller', value: 'Inventory Controller' },
        { label: 'Logistics Coordinator', value: 'Logistics Coordinator' },
        {
          label: 'Outside Sales Representative',
          value: 'Outside Sales Representative',
        },
        { label: 'Procurement Specialist', value: 'Procurement Specialist' },
        { label: 'Production Coordinator', value: 'Production Coordinator' },
        { label: 'Production Technician', value: 'Production Technician' },
        { label: 'Purchasing Coordinator ', value: 'Purchasing Coordinator ' },
        { label: 'Quality Coordinator ', value: 'Quality Coordinator ' },
        { label: 'Salesperson', value: 'Salesperson' },
        { label: 'Sales Analyst', value: 'Sales Analyst' },
        { label: 'Sales Assistant', value: 'Sales Assistant' },
        { label: 'Sales Associate', value: 'Sales Associate' },
        { label: 'Sales Consultant', value: 'Sales Consultant' },
        { label: 'Sales Coordinator', value: 'Sales Coordinator' },
        {
          label: 'Sales Development Representative',
          value: 'Sales Development Representative',
        },
        { label: 'Sales Engineer', value: 'Sales Engineer' },
        {
          label: 'Supply Chain Coordinator ',
          value: 'Supply Chain Coordinator ',
        },
        { label: 'Transport Coordinator ', value: 'Transport Coordinator ' },
        { label: 'Warehouse Coordinator', value: 'Warehouse Coordinator' },
      ];
    default:
      return message;
  }
};

export default getOptions;
