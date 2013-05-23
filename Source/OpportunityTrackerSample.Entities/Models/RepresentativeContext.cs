using System.Data.Entity;
using OpportunityTrackerSample.Entities.Filters;

namespace OpportunityTrackerSample.Entities.Models
{
    public class RepresentativeContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<OpportunityTrackerSample.Models.RepresentativeContext>());

        public RepresentativeContext()
        {
            Database.SetInitializer(new RepresentativeInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Representative>().HasOptional<Organization>(r => r.Organization).WithRequired(o => o.AssociatedRep);
            
            //modelBuilder.Entity<User>().HasOptional<Contact>(u => u.UserContact).WithOptionalDependent(c => c.ContactUser);
        }

        
        public DbSet<Representative> Representatives { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Opportunity> Opportunities { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactInfo> ContactInfo { get; set; }
        public DbSet<ContactCategory> ContactCategories { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
