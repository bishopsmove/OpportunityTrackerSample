using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Entities.Models
{
    public class Opportunity : EntityBase
    {

        public string Title { get; set; }
        public string Description_Short { get; set; }
        public string Description_Full { get; set; }
        public string Tags { get; set; }
        public int Rating { get; set; }

        public int RepID { get; set; }
        [ForeignKey("RepID")]
        public Representative AssociatedRep { get; set; }
        [InverseProperty("AssociatedOpportunity")]
        public virtual ICollection<Note> OpportunityNotes { get; set; }

        
    }
}
