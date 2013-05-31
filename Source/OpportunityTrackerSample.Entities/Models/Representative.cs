using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace OpportunityTrackerSample.Entities.Models
{
    public class Representative : EntityBase
    {
        public Representative()
        {
            this.Contacts = new HashSet<Contact>();
            this.Events = new HashSet<Event>();
            this.Opportunities = new HashSet<Opportunity>();
        }

        public virtual int Rating { get; set; }

        [InverseProperty("AssociatedRep")]
        public virtual Organization Organization { get; set; }
        [InverseProperty("AssociatedRep")]
        public virtual ICollection<Contact> Contacts { get; set; }

        [InverseProperty("AssociatedRep")]
        public virtual ICollection<Event> Events { get; set; }

        [InverseProperty("AssociatedRep")]
        public virtual ICollection<Opportunity> Opportunities { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }

                
    }
}