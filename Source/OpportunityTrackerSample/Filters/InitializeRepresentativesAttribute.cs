
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading;
using System.Web.Mvc;
using WebMatrix.WebData;
using StructureMap;
using OpportunityTrackerSample.Models;

namespace OpportunityTrackerSample.Filters
{
    
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class InitializeRepresentativesAttribute : ActionFilterAttribute
    {
        

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Ensure Purchasing LocalDB is initialized only once per app start
            //LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
            Database.SetInitializer(new RepresentativeInitializer());
        }


    }

    public class RepresentativeInitializer : DropCreateDatabaseAlways<RepresentativeContext>
       //DropCreateDatabaseIfModelChanges<RepresentativeContext>
    {

        protected override void Seed(RepresentativeContext context)
        {
            SeedDatabase(context);
        }

        public static void SeedDatabase(RepresentativeContext context)
        {
            _baseCreatedAtDate = new DateTime(2013, 4, 3, 14, 30, 0);

            var reps = new[] {
                // VendorId, Date, Value
                CreateRep("Smith", "Joe", "joe.smith@test.com", "6785551234"),
                CreateRep("Smeeth", "Walter", "smeethw@test.org", "4045551234"),
                CreateRep("Smythe", "Leslie", "leslie@test.net", "7705551234")
                
           };

            Array.ForEach(reps, t => context.Representatives.Add(t));

            context.SaveChanges(); // Save 'em
        }

        private static Representative CreateRep(string lname, string fname, string email, string phone)
        {
            _baseCreatedAtDate = _baseCreatedAtDate.AddMinutes(1);
            var rep = new Representative
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate
            };

            var contact = new Contact
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                LastName = lname,
                FirstName = fname
            };
            contact.ContactInfo.Add(new ContactInfo{
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = "email",
                Value = email
            });
            contact.ContactInfo.Add(new ContactInfo{
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = "phone",
                Value = phone
            });

            rep.Contacts.Add(contact);

            return rep;
        }

        private static DateTime _baseCreatedAtDate;

        public static void PurgeDatabase(RepresentativeContext context)
        {
            var reps = context.Representatives;
            foreach (var rep in reps)
            {
                reps.Remove(rep);
            }

            context.SaveChanges();
        }

    }
}