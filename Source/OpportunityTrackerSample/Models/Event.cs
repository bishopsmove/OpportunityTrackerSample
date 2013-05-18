using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class Event : EntityBase
    {
        public DateTime EventStart { get; set; }
        public DateTime EventEnd { get; set; }
        public string Title { get; set; }
        
        public int RepID { get; set; }
        [ForeignKey("RepID")]
        public Representative AssociatedRep { get; set; }
    }
}
