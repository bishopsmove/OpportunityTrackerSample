using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class ContactInfo : EntityBase
    {

        public string Category { get; set; }
        public string Value { get; set; }

        public int ContactID { get; set; }
        [ForeignKey("ContactID")]
        public Contact AssociatedContact { get; set; }
    }
}
