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
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public override int ID
        {
            get;
            set;
        }
        public string Name { get; set; }
        public string Address { get; set; }

        
        [ForeignKey("ID")]
        [InverseProperty("Organization")]
        public virtual Representative AssociatedRep { get; set; }
    }
}
