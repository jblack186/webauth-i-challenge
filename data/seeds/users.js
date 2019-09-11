
exports.seed = function(knex) {
  // Deletes ALL existing entries
 
      // Inserts seed entries
      return knex('users').insert([
        {username: 'jb', password: 'cray'},
        {username: 'jblsacksf186', password: 'logefving'},
        {username: 'fsBasm', password: 'wsfefgat'},
      ]);
    
};
