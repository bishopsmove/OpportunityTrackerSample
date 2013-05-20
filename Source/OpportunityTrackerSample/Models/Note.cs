using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class Note : EntityBase
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }

        public int OppID { get; set; }
        [ForeignKey("OppID")]
        public virtual Opportunity AssociatedOpportunity { get; set; }
    }
}
