using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Entities.Models
{
    public class User : EntityBase
    {
        
        public virtual Contact UserContact { get; set; }

        public virtual ICollection<Representative> Representatives { get; set; }

        public virtual ICollection<Contact> Colleagues { get; set; }
    }
}
