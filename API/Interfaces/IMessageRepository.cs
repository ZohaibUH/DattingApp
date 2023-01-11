using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message); 
        void DeleteMessage(Message message);  
        Task<Message> GetMessage(int d); 
        Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageparams); 
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string RecipientUserName); 
        
        void AddGroup(Group group);  
        void RemoveConnection(Connection connection); 
        Task<Connection>  GetConnection(string Connection); 
        Task<Group> GetMessageGroup(string groupName); 
        Task<Group> GetGroupForConnection(string ConnectionId);


    }
}