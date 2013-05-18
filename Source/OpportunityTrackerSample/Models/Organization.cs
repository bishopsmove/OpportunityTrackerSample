using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Models
{
    public class Organization : EntityBase
    {
        public string Name { get; set; }
        public string Address { get; set; }

        
    }
}
