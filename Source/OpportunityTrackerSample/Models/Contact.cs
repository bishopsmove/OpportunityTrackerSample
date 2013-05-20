using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class Contact : EntityBase
    {
        public Contact()
        {
            this.ContactInfo = new HashSet<ContactInfo>();
        }
        
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public virtual int Rating { get; set; }


        [InverseProperty("AssociatedContact")]
        public virtual ICollection<ContactInfo> ContactInfo { get; set; }

        public int RepID { get; set; }
        [ForeignKey("RepID")]
        public Representative AssociatedRep { get; set; }

    }
}
