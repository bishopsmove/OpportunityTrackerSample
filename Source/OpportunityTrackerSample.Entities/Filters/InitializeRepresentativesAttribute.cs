
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading;
using System.Web.Mvc;
using WebMatrix.WebData;
using StructureMap;
using OpportunityTrackerSample.Entities.Models;

namespace OpportunityTrackerSample.Entities.Filters
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

    public class RepresentativeInitializer : //DropCreateDatabaseAlways<RepresentativeContext>
       DropCreateDatabaseIfModelChanges<RepresentativeContext>
    {

        protected override void Seed(RepresentativeContext context)
        {
            SeedDatabase(context);
        }

        public static void SeedDatabase(RepresentativeContext context)
        {
            _baseCreatedAtDate = new DateTime(2013, 5, 1, 14, 30, 0);

            var contactTypes = ContactType_LookupSeed();

            Array.ForEach(contactTypes, c => context.ContactTypes.Add(c));

            var reps = new[] {
                // VendorId, Date, Value
                CreateRep("Smith", "Joe", "joe.smith@test.com", "6785551234", "linkedin.com/in/joesmith", context),
                CreateRep("Smeeth", "Walter", "smeethw@test.org", "4045551234", "linkedin.com/in/waltersmeeth", context),
                CreateRep("Smythe", "Leslie", "leslie@test.net", "7705551234", "linkedin.com/in/lesliesmythe", context)
                
           };

            Array.ForEach(reps, t => context.Representatives.Add(t));

            

            context.SaveChanges(); // Save 'em
        }

        private static Representative CreateRep(string lname, string fname, string email, string phone, string linkedin, RepresentativeContext context)
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
                Category = context.ContactTypes.Find(1),
                Value = email
            });
            contact.ContactInfo.Add(new ContactInfo{
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = context.ContactTypes.Find(2),
                Value = phone
            });
            contact.ContactInfo.Add(new ContactInfo
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = context.ContactTypes.Find(6),
                Value = linkedin
            });

            rep.Contacts.Add(contact);

            return rep;
        }

        private static ContactType[] ContactType_LookupSeed()
        {
            _baseCreatedAtDate = _baseCreatedAtDate.AddMinutes(1);
            var email = new ContactType { TypeName = "email", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var phone = new ContactType { TypeName = "phone", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var twitter = new ContactType { TypeName = "twitter", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var github = new ContactType { TypeName = "github", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var youtube = new ContactType { TypeName = "youtube", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var linkedin = new ContactType { TypeName = "linkedin", CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };

            return new ContactType[] {email, phone, twitter, github, youtube, linkedin};
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