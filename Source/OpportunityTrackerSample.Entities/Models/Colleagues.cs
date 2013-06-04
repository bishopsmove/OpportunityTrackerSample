using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Entities.Models
{
    public class Colleagues : EntityBase
    {
        public Colleagues()
        {
            this.Contacts = new HashSet<Contact>();
        }

        public virtual ICollection<Contact> Contacts { get; set; }
    }
}
