
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

    public class RepresentativeInitializer : DropCreateDatabaseAlways<RepresentativeContext>
       //DropCreateDatabaseIfModelChanges<RepresentativeContext>
    {
        private static DateTime _baseCreatedAtDate;

        protected override void Seed(RepresentativeContext context)
        {
            SeedDatabase(context);
        }

        public static void SeedDatabase(RepresentativeContext context)
        {
            _baseCreatedAtDate = new DateTime(2013, 5, 1, 14, 30, 0);

            var contactTypes = ContactType_LookupSeed();

            Array.ForEach(contactTypes, c => context.ContactCategories.Add(c));

            var users = new[] {
                CreateUser("User1", "Tester", "tester.user1@test.com", "Tester1", "tester1", false),
                CreateUser("User2", "Tester", "tester.user2@test.com", "Tester2", "tester2", false),
                CreateUser("User3", "Tester", "tester.user3@test.com", "Tester3", "tester3", false),
                CreateUser("User4", "Tester", "tester.user4@test.com", "Tester4", "tester4", false)
            };

            Array.ForEach(users, u => context.Users.Add(u));

            context.SaveChanges();

            var reps = new[] {
                // VendorId, Date, Value
                CreateRep("Smith", "Joe", "joe.smith@test.com", "6785551234", "linkedin.com/in/joesmith", 1, 2, contactTypes),
                CreateRep("Smeeth", "Walter", "smeethw@test.org", "4045551234", "linkedin.com/in/waltersmeeth", 2, 4, contactTypes),
                CreateRep("Smythe", "Leslie", "leslie@test.net", "7705551234", "linkedin.com/in/lesliesmythe", 3, 2, contactTypes)
                
           };

            Array.ForEach(reps, t => context.Representatives.Add(t));

            

            context.SaveChanges(); // Save 'em
        }

        private static Representative CreateRep(string lname, string fname, string email, string phone, string linkedin, int repRating, int contactRating, ContactCategory[] cats)
        {
            _baseCreatedAtDate = _baseCreatedAtDate.AddMinutes(1);
            var rep = new Representative
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Rating = repRating, 
            };

            var contact = new Contact
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                LastName = lname,
                FirstName = fname,
                Rating = contactRating
            };
            contact.ContactInfo.Add(new ContactInfo{
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = cats[0],
                Value = email
            });
            contact.ContactInfo.Add(new ContactInfo{
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = cats[1],
                Value = phone
            });
            contact.ContactInfo.Add(new ContactInfo
            {
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate,
                Category = cats[5],
                Value = linkedin
            });

            rep.Contacts.Add(contact);

            return rep;
        }

        private static ContactCategory[] ContactType_LookupSeed()
        {
            _baseCreatedAtDate = _baseCreatedAtDate.AddMinutes(1);
            var email = new ContactCategory { TypeName = ContactType.email, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var phone = new ContactCategory { TypeName = ContactType.phone, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var twitter = new ContactCategory { TypeName = ContactType.twitter, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var github = new ContactCategory { TypeName = ContactType.github, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var youtube = new ContactCategory { TypeName = ContactType.google, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };
            var linkedin = new ContactCategory { TypeName = ContactType.linkedin, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };

            return new ContactCategory[] { email, phone, twitter, github, youtube, linkedin };
        }

        private static User CreateUser(string lastName, string firstName, string email, string displayName, string password, bool externalAuth)
        {
            var newUser = new User { Password=password, ExternalAuth=externalAuth, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate };

            var newContact = new Contact
            {
                LastName = lastName,
                FirstName = firstName,
                DisplayName = displayName,
                Rating = 0,
                CreateDate = _baseCreatedAtDate,
                ModifiedDate = _baseCreatedAtDate
            };

            newContact.ContactInfo.Add(new ContactInfo { Category = new ContactCategory { TypeName = ContactType.email }, Value = email, CreateDate = _baseCreatedAtDate, ModifiedDate = _baseCreatedAtDate });
            newUser.UserContact = newContact;

            return newUser;
        }

        

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