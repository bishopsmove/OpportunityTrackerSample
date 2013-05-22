using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;


namespace OpportunityTrackerSample.Entities.Models
{
    public class ContactType : EntityBase
    {
        public string TypeName { get; set; }
    }
}
