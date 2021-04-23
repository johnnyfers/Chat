import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionService";
import { UserService } from "../services/UserService";
import { MessagesService } from "../services/MessageService";

interface IParams{
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsServices = new ConnectionsService();
    const usersServices = new UserService()
    const messagesService = new MessagesService();


    socket.on("client_first_access", async (params) => {

        await console.log(params)


        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;

        const userExists = await usersServices.findByEmail(email)

        if (!userExists) {
            const user = await usersServices.create(email);

            await connectionsServices.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id
        } else {
            user_id = userExists.id
            const connection = await connectionsServices.findByUserId(userExists.id);


            if(!connection){
            await connectionsServices.create({
                socket_id,
                user_id: userExists.id
            });
        } else{
            connection.socket_id = socket_id;
            await connectionsServices.create(connection);
        }
        };

        await messagesService.create({
            text,
            user_id
        })

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit('client_list_all_msgs', allMessages);

    });

    socket.on('client_send_message_to_admin', async (params)=>{
        const { text, socket_admin_id } = params;

        const socket_id = socket.id

        const {user_id} = await connectionsServices.findByUserId(socket_id)

        const message = await messagesService.create({
            text,
            user_id
        })


        io.to(socket_admin_id).emit('admin_receive_message',{
            message,
            socket_id
        })
    })

});

