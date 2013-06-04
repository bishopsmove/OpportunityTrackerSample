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
        
        
        
        [InverseProperty("ContactUser")]
        public virtual Contact UserContact { get; set; }

        public string Password { get; set; }

        public bool ExternalAuth { get; set; }
    }
}
