using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OpportunityTrackerSample.Entities.Interfaces
{
    public interface IShareable
    {
        bool isShared(Entities.Models.EntityBase _base);
        string OriginalOwner(Entities.Models.EntityBase _base);
    }
}
